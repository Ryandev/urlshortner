#!/usr/bin/env sh
#Must use the rest api as the az consumption cli command does not work (uses legacy api according to outstanding tickets)

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

#Global args
RESOURCE_GROUP=''

function abort {
    echo "$*" >&2; exit 1
}

function usage {
    abort "Usage: $0 [-g resource_group]"
}

function loadGlobalArgs {
    while getopts "g:" arg; do
        case $arg in
            g)
                RESOURCE_GROUP=${OPTARG}
                ;;
            *)
                usage
                ;;
        esac
    done

    [ -z "$RESOURCE_GROUP" ] && echo 'Invalid resource group' && usage

    return 0
}

function checkEnv {
    which az 1>/dev/null || abort "Missing az cli, aborting deploy"
    return 0
}


checkEnv && loadGlobalArgs $@ || usage

ALL_LOCK_IDS=$(az lock list -g "$RESOURCE_GROUP" | jq -cre '.[].id')

for LOCK_ID in "$ALL_LOCK_IDS"; do
    if [ ! -z "$LOCK_ID" ]; then
        echo "Removing lock: $LOCK_ID"
        az lock delete -g "$RESOURCE_GROUP" --ids "$LOCK_ID" || abort "Failed to delete lock: $LOCK_ID"
    fi
done

echo "Deleted all locks for resource group: $RESOURCE_GROUP"
