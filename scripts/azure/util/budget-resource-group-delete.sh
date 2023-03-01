#!/usr/bin/env sh
#Must use the rest api as the az consumption cli command does not work (uses legacy api according to outstanding tickets)

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

function abort {
    echo "$*" >&2 && exit 1
}

#Global args
SUBSCRIPTION_ID=''
RESOURCE_GROUP=''

function loadGlobalArgs {
    #Load args to #args var
    POSITIONAL=()
    while [[ $# -gt 0 ]]
    do
        key="$1"
        shift

        value="$1"
        shift

        case $key in
            -s|--subscription)
            SUBSCRIPTION_ID="$value"
            ;;
            -g|--resource-group)
            RESOURCE_GROUP="$value"
            ;;
            *)    # unknown option
            POSITIONAL+=("$1") # save it in an array for later
            shift # past argument    
        esac
    done
    set -- "${POSITIONAL[@]}" # restore positional parameters

    [[ -z "$SUBSCRIPTION_ID" ]] && abort "Abort, no SUBSCRIPTION arg"
    [[ -z "$RESOURCE_GROUP" ]] && abort "Abort, no RESOURCE-GROUP arg"

    return 0
}

loadGlobalArgs $@

ACCESS_TOKEN=$(az account get-access-token | jq -cre '.accessToken') || abort "Failed to get az access-token"

REST_BUDGET_LIST_API="https://management.azure.com/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Consumption/budgets?api-version=2021-10-01"

BUDGET_NAMES=$(curl -X GET --header "Authorization: Bearer $ACCESS_TOKEN" "$REST_BUDGET_LIST_API" | jq -cre '.value[].name')

for BUDGET_NAME in "$BUDGET_NAMES"; do
    echo "Removing budget: $BUDGET_NAME"
    REST_BUDGET_DELETE_API="https://management.azure.com/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Consumption/budgets/$BUDGET_NAME?api-version=2021-10-01"
    curl -X DELETE --header "Authorization: Bearer $ACCESS_TOKEN" "$REST_BUDGET_DELETE_API" || abort "Failed to delete budget $budgetName" || abort "Failed to delete budget: $BUDGET_NAME"
done

echo "Deleted budgets for resource group: $RESOURCE_GROUP_NAME"
exit 0