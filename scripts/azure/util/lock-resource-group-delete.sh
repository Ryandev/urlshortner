#!/usr/bin/env sh
#Must use the rest api as the az consumption cli command does not work (uses legacy api according to outstanding tickets)

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

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
    [ -z "$RESOURCE_GROUP" ] && usage

    return 0
}

function checkEnv {
    which az 1>/dev/null || abort "Missing az cli, aborting deploy"
    return 0
}


checkEnv && loadGlobalArgs $@ || usage

echo "Deleting resource locks for subscription:$SUBSCRIPTION_ID with resource-group:$RESOURCE_GROUP"

ALL_LOCK_IDS=$(az lock list -s "$SUBSCRIPTION_ID" -g "$RESOURCE_GROUP" | jq -cre '.[].id')

az account set --subscription "$SUBSCRIPTION_ID" || abort "Failed to set account to: $SUBSCRIPTION_ID"

for LOCK_ID in "$ALL_LOCK_IDS"; do
    if [ ! -z "$LOCK_ID" ]; then
        echo "Removing lock: $LOCK_ID"
        az lock delete -s "$SUBSCRIPTION_ID" -g "$RESOURCE_GROUP" --ids "$LOCK_ID" || abort "Failed to delete lock: $LOCK_ID"
    fi
done

echo "Deleted all locks for resource group: $RESOURCE_GROUP"

