#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
BUILD_OUTPUT_FRONTEND="$SCRIPT_DIR/../../dist/packages/frontend/exported"
BUILD_OUTPUT_API="$SCRIPT_DIR/../../dist/packages/api"
STORAGE_NAME=''
STORAGE_CONTAINER='$web'
APPSERVICE_NAME=''
DEPLOYMENT_FILE=""

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

    [ -f "$DEPLOYMENT_OUTPUT" ] || abort "Cannot find deployment file: $DEPLOYMENT_OUTPUT"
    return 0
}

function checkEnv {
    which az 1>/dev/null || abort "Missing az cli, aborting deploy"
    [ -d "$BUILD_OUTPUT_FRONTEND" ] || abort "Missing build output for frontend"
    [ -d "$BUILD_OUTPUT_API" ] || abort "Missing build output for frontend"
    return 0
}

checkEnv && loadGlobalArgs $@ || usage

SUBSCRIPTION_ID=$(cat "$DEPLOYMENT_OUTPUT" | jq -cre '.name')
[ -z "$SUBSCRIPTION_ID" ] && abort "Missing subscription ID"

RESOURCE_GROUP_NAME=$(cat "$DEPLOYMENT_OUTPUT" | jq -cre '.properties.outputs.resourceGroup.value.parameters.name.value')
[ -z "$RESOURCE_GROUP_NAME" ] && abort "Missing RESOURCE_GROUP_NAME"

STORAGE_NAME=$(cat "$DEPLOYMENT_OUTPUT" | jq -cre '.properties.outputs.storage.value.outputs.storage.value.resourceId' | sed 's/Microsoft.Storage\/storageAccounts\///g')
[ -z "$STORAGE_NAME" ] && abort "Missing STORAGE_NAME"

APPSERVICE_NAME=$(cat "$DEPLOYMENT_OUTPUT" | jq -cre '.properties.outputs.appService.value.outputs.appService.value.properties.deploymentId')
[ -z "$APPSERVICE_NAME" ] && abort "Missing APPSERVICE_NAME"


az account set --subscription "$SUBSCRIPTION_ID" || abort "Failed to set account to: $SUBSCRIPTION_ID"

echo "1. Publishing new frontend to storageaccount:$STORAGE_NAME"

MUST_REMOVE_EXISTING=$(az storage blob exists --subscription "$SUBSCRIPTION_ID" --auth-mode key --account-name "$STORAGE_NAME" --container-name "$STORAGE_CONTAINER" --name "index.html" | jq -cre '.exists')

if [ "$MUST_REMOVE_EXISTING" == 'true' ]; then
    az storage blob delete-batch --auth-mode key --subscription "$SUBSCRIPTION_ID" --account-name "$STORAGE_NAME" --source "$STORAGE_CONTAINER" --pattern '/*' || abort "Failed to delete existing files"
fi

az storage blob upload-batch --subscription "$SUBSCRIPTION_ID" --account-name "$STORAGE_NAME" --source "$BUILD_OUTPUT_FRONTEND" --destination "$STORAGE_CONTAINER" --destination-path "/" --overwrite || abort "Failed to publish new frontend to storage"

echo "2. Publishing new backend api to appservice:$APPSERVICE_NAME"
rm "$TMP_ZIP_PATH"
TMP_ZIP_PATH="$SCRIPT_DIR/deploy_as.zip"
zip -jr "$TMP_ZIP_PATH" "$BUILD_OUTPUT_API"
az webapp deploy --subscription "$SUBSCRIPTION_ID" --resource-group "$RESOURCE_GROUP_NAME" --name "$APPSERVICE_NAME" --src-path "$TMP_ZIP_PATH" --type=startup || abort "Failed to deploy API appservice"
rm "$TMP_ZIP_PATH"

echo 'Deployment complete'