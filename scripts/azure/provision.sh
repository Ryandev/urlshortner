#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

function abort {
    echo "$*" >&2; exit 1
}

function usage {
    abort "Usage: $0 [-b bicep_file] [-o deployment_output_path]"
}

BICEP_FILE=""
DEPLOYMENT_OUTPUT="/tmp/provision.log"

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

    [ -z "$BICEP_FILE" ] && usage
    [ -f "$BICEP_FILE" ] || abort "Cannot find bicep file: $BICEP_FILE"
    return 0
}

function checkEnv {
    which az 1>/dev/null || abort "Missing az cli, aborting deploy"
    return 0
}

checkEnv && loadGlobalArgs $@ || usage

SUBSCRIPTION_ID=$(cat "$BICEP_FILE" | jq -cre '.metadata.subscriptionId.value')
[ -z "$SUBSCRIPTION_ID" ] && abort "Missing subscription ID"

LOCATION=$(cat "$BICEP_FILE" | jq -cre '.parameters.location.value')
[ -z "$LOCATION" ] && abort "Missing LOCATION"

RESOURCE_GROUP_NAME=$(cat "$BICEP_FILE" | jq -cre '.parameters.resourceGroupName.value')
[ -z "$RESOURCE_GROUP_NAME" ] && abort "Missing RESOURCE_GROUP_NAME"

az account set --subscription "$SUBSCRIPTION_ID" || abort "Failed to set account to: $SUBSCRIPTION_ID"

# Must remove all locks before removeing budgets
"$SCRIPT_DIR/util/lock-resource-group-delete.sh" \
     -s "$SUBSCRIPTION_ID" \
     -g "$RESOURCE_GROUP_NAME" \
     || abort "Failed to delete resource group locks"

# We cannot modify the start date to an existing budget in bicep, therefore we *must* remove it before starting
"$SCRIPT_DIR/util/budget-resource-group-delete.sh" \
     -s "$SUBSCRIPTION_ID" \
     -g "$RESOURCE_GROUP_NAME" \
     || abort "Failed to delete outstanding budgets"

az deployment sub create \
    --name "$SUBSCRIPTION_ID" \
    --subscription "$SUBSCRIPTION_ID" \
    --location "$LOCATION" \
    --template-file "$SCRIPT_DIR"/bicep/deploy.bicep \
    --parameter @"$BICEP_FILE" > "$DEPLOYMENT_OUTPUT" \
    || abort "Deployment failed"

echo 'Deployment success!'
