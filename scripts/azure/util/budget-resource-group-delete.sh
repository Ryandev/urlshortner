#!/usr/bin/env bash
#Must use the rest api as the az consumption cli command does not work (uses legacy api according to outstanding tickets)

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

#Global args
SUBSCRIPTION_ID=''
RESOURCE_GROUP=''

function abort {
    echo "$*" >&2; exit 1
}

function usage {
    abort "Usage: $0 [-g resource_group]"
}

function loadGlobalArgs {
    while getopts "s:g:" arg; do
        case $arg in
            s)
                SUBSCRIPTION_ID=${OPTARG}
                ;;
            g)
                RESOURCE_GROUP=${OPTARG}
                ;;
            *)
                usage
                ;;
        esac
    done

    [ -z "$SUBSCRIPTION_ID" ] && usage
    [ $(echo "$SUBSCRIPTION_ID" | wc -m) -eq 37 ] || abort "Incorrect subscription_id length, check subscription: $SUBSCRIPTION_ID"
    [ -z "$RESOURCE_GROUP" ] && usage

    return 0
}

function checkEnv {
    which az 1>/dev/null || abort "Missing az cli, aborting deploy"
    return 0
}


checkEnv && loadGlobalArgs $@ || usage

echo "Deleting budgets for subscription:$SUBSCRIPTION_ID with resource-group:$RESOURCE_GROUP"

az account set --subscription "$SUBSCRIPTION_ID" || abort "Failed to set account to: $SUBSCRIPTION_ID"

az account set --subscription "$SUBSCRIPTION_ID" && az account get-access-token -s "$SUBSCRIPTION_ID"
ACCESS_TOKEN=$(az account set --subscription "$SUBSCRIPTION_ID"  && az account get-access-token -s "$SUBSCRIPTION_ID" | jq -cre '.accessToken') || abort "Failed to get az access-token"
[ -z "$ACCESS_TOKEN" ] && abort "Failed to get access token from response: $ACCESS_TOKEN"

REST_BUDGET_LIST_API="https://management.azure.com/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Consumption/budgets?api-version=2021-10-01"

BUDGET_NAMES=$(curl -X GET --header "Authorization: Bearer $ACCESS_TOKEN" "$REST_BUDGET_LIST_API" | jq -cr '.value[].name')
[ $? -ne 0 ] && abort "Failed to get budget names: $BUDGET_NAMES"

for BUDGET_NAME in "$BUDGET_NAMES"; do
    if [ ! -z "$BUDGET_NAME" ]; then
        echo "Removing budget: $BUDGET_NAME"
        REST_BUDGET_DELETE_API="https://management.azure.com/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Consumption/budgets/$BUDGET_NAME?api-version=2021-10-01"
        curl -X DELETE --header "Authorization: Bearer $ACCESS_TOKEN" "$REST_BUDGET_DELETE_API" || abort "Failed to delete budget $budgetName" 1>/dev/null || abort "Failed to delete budget: $BUDGET_NAME"
    fi
done

echo "Deleted budgets for resource group: $RESOURCE_GROUP_NAME"
