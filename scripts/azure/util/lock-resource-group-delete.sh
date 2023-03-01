#!/usr/bin/env sh
#Must use the rest api as the az consumption cli command does not work (uses legacy api according to outstanding tickets)

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

function abort {
    echo "$*" >&2; exit 1
}

#Global args
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
            -g|--resource-group)
            RESOURCE_GROUP="$value"
            ;;
            *)    # unknown option
            POSITIONAL+=("$1") # save it in an array for later
            shift # past argument    
        esac
    done
    set -- "${POSITIONAL[@]}" # restore positional parameters

    [[ -z "$RESOURCE_GROUP" ]] && abort "Abort, no RESOURCE-GROUP arg"

    return 0
}

loadGlobalArgs $@
ALL_LOCK_IDS=$(az lock list -g "$RESOURCE_GROUP" | jq -cre '.[].id')

for LOCK_ID in "$ALL_LOCK_IDS"; do
    if [ ! -z "$LOCK_ID" ]; then
        echo "Removing lock: $LOCK_ID"
        az lock delete -g "$RESOURCE_GROUP" --ids "$LOCK_ID" || abort "Failed to delete lock: $LOCK_ID"
    fi
done

echo "Deleted all locks for resource group: $RESOURCE_GROUP_NAME"
exit 0