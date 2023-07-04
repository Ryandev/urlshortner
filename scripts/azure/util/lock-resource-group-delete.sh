#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
[ -d "$SCRIPT_DIR" ] || abort "Missing dir: $SCRIPT_DIR"

#Global args
SUBSCRIPTION_ID=''
RESOURCE_GROUP=''

function abort {
    echo "$*" >&2; exit 1
}

function usage {
    abort "Usage: $0 [-s subscription_id] [-g resource_group]"
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
    [ ${#SUBSCRIPTION_ID} -eq 36 ] || abort "Incorrect subscription_id length, check subscription: $SUBSCRIPTION_ID"
    [ -z "$RESOURCE_GROUP" ] && usage

    return 0
}

function checkEnv {
    which az 1>/dev/null || abort "Missing az cli, aborting deploy"
    return 0
}


checkEnv || usage
loadGlobalArgs "$@" || usage

echo "Deleting resource locks for subscription:$SUBSCRIPTION_ID with resource-group:$RESOURCE_GROUP"

az account set --subscription "$SUBSCRIPTION_ID" || abort "Failed to set account to: $SUBSCRIPTION_ID"

ALL_LOCK_IDS=$(az lock list -g "$RESOURCE_GROUP" | jq -cr '.[].id') || abort "Failed to get lock list"

for LOCK_ID in $ALL_LOCK_IDS; do
    if [ -n "$LOCK_ID" ]; then
        echo "Removing lock: $LOCK_ID"
        DELETE_RESPONSE=$(az lock delete -g "$RESOURCE_GROUP" --ids "$LOCK_ID") || abort "Failed to delete lock: $LOCK_ID"
        DELETE_ERROR_MESSAGE=$(echo "$DELETE_RESPONSE" | jq -cr '.error.message')
        [ -n "$DELETE_ERROR_MESSAGE" ] && abort "Failed to delete lock, error: $DELETE_ERROR_MESSAGE"
    fi
done

echo "Deleted all locks for resource group: $RESOURCE_GROUP"

