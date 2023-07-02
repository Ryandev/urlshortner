#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

#Global args
BICEP_FILE=""
DEPLOYMENT_OUTPUT="/tmp/provision.log"
SUBSCRIPTION_ID=''
LOCATION=''
RESOURCE_GROUP=''

function abort {
    echo "$*" >&2; exit 1
}

function usage {
    abort "Usage: $0 [-b bicep_file] [-o deployment_output_path]"
}

function loadGlobalArgs {
    while getopts "b:o:" arg; do
        case $arg in
            b)
                BICEP_FILE=${OPTARG}
                ;;
            o)
                DEPLOYMENT_OUTPUT=${OPTARG}
                ;;
            *)
                usage
                ;;
        esac
    done

    [ -n "$BICEP_FILE" ] || usage
    [ -f "$BICEP_FILE" ] || abort "Cannot find bicep file: $BICEP_FILE"

    SUBSCRIPTION_ID=$(jq -cre '.metadata.subscriptionId.value' < "$BICEP_FILE")
    [ -n "$SUBSCRIPTION_ID" ] || abort "Missing subscription ID"
    [ ${#SUBSCRIPTION_ID} -eq 36 ] || abort "Incorrect subscription_id length, check subscription: $SUBSCRIPTION_ID"

    LOCATION=$(jq -cre '.parameters.location.value' < "$BICEP_FILE")
    [ -n "$LOCATION" ] || abort "Missing LOCATION"

    RESOURCE_GROUP=$(jq -cre '.parameters.resourceGroupName.value' < "$BICEP_FILE")
    [ -n "$RESOURCE_GROUP" ] || abort "Missing RESOURCE_GROUP"

    return 0
}

function checkEnv {
    which az 1>/dev/null || abort "Missing az cli, aborting deploy"
    return 0
}

checkEnv || usage
loadGlobalArgs "$@" || usage

echo "Using bicep file $BICEP_FILE to provisioning azure with subscription:$SUBSCRIPTION_ID, resource-group:$RESOURCE_GROUP, location:$LOCATION"

az account set --subscription "$SUBSCRIPTION_ID" || abort "Failed to set account to: $SUBSCRIPTION_ID"

# Must remove all locks before removeing budgets
"$SCRIPT_DIR/util/lock-resource-group-delete.sh" \
     -s "$SUBSCRIPTION_ID" \
     -g "$RESOURCE_GROUP" \
     || abort "Failed to delete resource group locks"

# We cannot modify the start date to an existing budget in bicep, therefore we *must* remove it before starting
"$SCRIPT_DIR/util/budget-resource-group-delete.sh" \
     -s "$SUBSCRIPTION_ID" \
     -g "$RESOURCE_GROUP" \
     || abort "Failed to delete outstanding budgets"

echo 'Provisioning Azure resources'

az deployment sub create \
    --name "$SUBSCRIPTION_ID" \
    --subscription "$SUBSCRIPTION_ID" \
    --location "$LOCATION" \
    --template-file "$SCRIPT_DIR"/bicep/deploy.bicep \
    --parameter @"$BICEP_FILE" > "$DEPLOYMENT_OUTPUT" \
    || abort "Deployment failed"

echo 'Provision success!'
