#!/usr/bin/env bash

#Global args
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
[ -d "$SCRIPT_DIR" ] || abort "Missing dir: $SCRIPT_DIR"

BUILD_OUTPUT_FRONTEND="$SCRIPT_DIR/../../dist/packages/frontend/exported"
[ -d "$BUILD_OUTPUT_FRONTEND" ] || abort "Missing dir: $BUILD_OUTPUT_FRONTEND"

BUILD_OUTPUT_API="$SCRIPT_DIR/../../dist/packages/api"
[ -d "$BUILD_OUTPUT_API" ] || abort "Missing dir: $BUILD_OUTPUT_API"

STORAGE_NAME=''
# shellcheck disable=SC2016
STORAGE_CONTAINER='$web'
APPSERVICE_NAME=''
SUBSCRIPTION_ID=''
RESOURCE_GROUP=''
STORAGE_NAME=''
APPSERVICE_NAME=''


function abort {
    echo "$*" >&2; exit 1
}

function usage {
    abort "Usage: $0 [-d deployment_file]"
}

function loadGlobalArgs {
    while getopts "d:" arg; do
        case $arg in
            d)
                DEPLOYMENT_OUTPUT=${OPTARG}
                ;;
            *)
                usage
                ;;
        esac
    done

    [ -n "$DEPLOYMENT_OUTPUT" ] || abort "Missing deployment output"
    [ -f "$DEPLOYMENT_OUTPUT" ] || abort "Cannot find deployment file: $DEPLOYMENT_OUTPUT"

    SUBSCRIPTION_ID=$(jq -cre '.name' < "$DEPLOYMENT_OUTPUT")
    [ -n "$SUBSCRIPTION_ID" ] || abort "Missing subscription ID"
    [ ${#SUBSCRIPTION_ID} -eq 36 ] || abort "Incorrect subscription_id length, check subscription: $SUBSCRIPTION_ID"

    RESOURCE_GROUP=$(jq -cre '.properties.outputs.resourceGroup.value.parameters.name.value' < "$DEPLOYMENT_OUTPUT")
    [ -n "$RESOURCE_GROUP" ] || abort "Missing RESOURCE_GROUP"

    STORAGE_NAME=$(jq -cre '.properties.outputs.storage.value.outputs.storage.value.resourceId' < "$DEPLOYMENT_OUTPUT" | sed 's/Microsoft.Storage\/storageAccounts\///g')
    [ -n "$STORAGE_NAME" ] || abort "Missing STORAGE_NAME"

    APPSERVICE_NAME=$(jq -cre '.properties.outputs.appService.value.outputs.appService.value.properties.deploymentId' < "$DEPLOYMENT_OUTPUT")
    [ -n "$APPSERVICE_NAME" ] || abort "Missing APPSERVICE_NAME"

    return 0
}

function checkEnv {
    which az 1>/dev/null || abort "Missing az cli, aborting deploy"
    which zip 1>/dev/null || abort "Missing zip command, aborting deploy"
    [ -d "$BUILD_OUTPUT_FRONTEND" ] || abort "Missing build output for frontend"
    [ -d "$BUILD_OUTPUT_API" ] || abort "Missing build output for frontend"
    return 0
}

checkEnv || usage
loadGlobalArgs "$@" || usage

echo "1. Publishing new frontend to storageaccount:$STORAGE_NAME"

az account set --subscription "$SUBSCRIPTION_ID" || abort "Failed to set account to: $SUBSCRIPTION_ID"

MUST_REMOVE_EXISTING=$(az storage blob exists --subscription "$SUBSCRIPTION_ID" --auth-mode key --account-name "$STORAGE_NAME" --container-name "$STORAGE_CONTAINER" --name "index.html" | jq -cre '.exists')

if [ "$MUST_REMOVE_EXISTING" == 'true' ]; then
    az storage blob delete-batch --auth-mode key --subscription "$SUBSCRIPTION_ID" --account-name "$STORAGE_NAME" --source "$STORAGE_CONTAINER" --pattern '/*' || abort "Failed to delete existing files"
fi

az storage blob upload-batch --subscription "$SUBSCRIPTION_ID" --account-name "$STORAGE_NAME" --source "$BUILD_OUTPUT_FRONTEND" --destination "$STORAGE_CONTAINER" --destination-path "/" || abort "Failed to publish new frontend to storage"

echo "2. Publishing new backend api to appservice:$APPSERVICE_NAME"
rm "$TMP_ZIP_PATH" 2>/dev/null
TMP_ZIP_PATH="$SCRIPT_DIR/deploy_as.zip"
zip -j "$TMP_ZIP_PATH" "$BUILD_OUTPUT_API" -i "$BUILD_OUTPUT_API/*.js" || abort "Failed to generate deployment zip"
[ -f "$TMP_ZIP_PATH" ] || abort "Missing deployment zip"
az webapp deploy --subscription "$SUBSCRIPTION_ID" --resource-group "$RESOURCE_GROUP" --name "$APPSERVICE_NAME" --src-path "$TMP_ZIP_PATH" --type=startup || abort "Failed to deploy API appservice"
rm "$TMP_ZIP_PATH"

echo 'Deployment complete'