#!/usr/bin/env bash
# Supply with lighthouserc.js & path to html & run

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
[ -d "$SCRIPT_DIR" ] || abort "Missing dir: $SCRIPT_DIR"
PROJECT_DIR="$SCRIPT_DIR/../../"
[ -d "$PROJECT_DIR" ] || abort "Missing dir: $PROJECT_DIR"

function abort {
    echo "$*" >&2 && exit 1
}

function loadGlobalArgs {
    #Set defaults
    args['ROOT_ONLY']=false
    args['OUTPUT_DIR']="$PROJECT_DIR/reports/lighthouse"

    #Load args to #args var
    POSITIONAL=()
    while [[ $# -gt 0 ]]
    do
        key="$1"
        shift

        arg="$1"
        shift

        #File Paths can contain spaces, however they are interpreted as seperate arguments, loop through until we get to the next arg i.e. -p
        REGEX_ARGMATCH='^--?[a-zA-Z]{1,}$' #Will match '-arg', '--arg', but not '-arg1' or '-'
        while [[ ! "$1" =~ $REGEX_ARGMATCH ]] && [ $# -gt 0 ]; do
            arg="$arg"" ""$1" #Append $1 with a space to the current $arg
            shift
        done

        case $key in
            #Path to packaged pwa
            -s|-d|--source|--source_dir|--source-dir|--sourceDir|--SourceDir)
            args['SOURCE_DIR']="$arg"
            ;;
            #Path to lhci config js
            -l|--lighthouse|--lighthousefile|--lighthouse-file|--lighthouse_file)
            args['LIGHTHOUSE_CONFIG']="$arg"
            ;;
            #Output path
            -o|--output|--output-dir|--output_dir)
            args['OUTPUT_DIR']="$arg"
            ;;
            #If present, only run for the root-dir, not *all* urls
            -r|--root-only)
            args['ROOT_ONLY']="$arg"
            ;;
            *)    # unknown option
            POSITIONAL+=("$1") # save it in an array for later
            shift # past argument    
        esac
    done
    set -- "${POSITIONAL[@]}" # restore positional parameters

    [[ -n "${args['LIGHTHOUSE_CONFIG']}" ]] || abort "Missing arg: LIGHTHOUSE_CONFIG, aborting"
    [[ -f "${args['LIGHTHOUSE_CONFIG']}" ]] || abort "Missing/invalid file: LIGHTHOUSE_CONFIG, aborting"

    [[ -n "${args['SOURCE_DIR']}" ]] || abort  "Missing arg: SOURCE_DIR, aborting"
    [[ -d "${args['SOURCE_DIR']}" ]] || abort "Missing/invalid dir: SOURCE_DIR, aborting"

    return 0
}

#Find all html paths from $1 as relative paths
function nestedHtmlPaths() {
    local dirSearch="$*"
    pushd . || abort "pushd failed"
    cd "$dirSearch" || abort "cd failed: $dirSearch"
    find ./ -name '*.html'
    popd || abort "popd failed"
    return 0
}

#Find the path this html file is expected to be hosted from
function getExpectedHostedPath() {
    local htmlPath="$*"
    # shellcheck disable=SC2155
    local htmlData=$(cat "$htmlPath")
    local hostedDir='/'

    if [[ "$htmlData" == *'base href'* ]]; then
        # 1. Find & remove any text leading upto & including <base href, 
        # 2. remove the first instance of /> & all text after
        # 3. remove all [=,",'] instances
        # shellcheck disable=SC2155
        local hostedDir=$(echo "$htmlData" | sed 's/^.*\<base href//g' | sed 's/\/>.*$//g' | sed 's/=//g' | sed 's/\"//g' | sed "s/\'//g")
    fi

    if [ -z "$hostedDir" ]; then
        #No base-href value, assume root
        echo "/"
    fi

    echo "$hostedDir"
    return 0
}

##### START #####

unset args
declare -A args || abort "Associative arrays not supported!, Needs **bash** version > 4."

loadGlobalArgs "$@" || abort "Invalid arguments! Aborting"

#Get all paths from the source-dir
RELATIVE_PATHS=$(nestedHtmlPaths "${args['SOURCE_DIR']}")

if [ "${args['ROOT_ONLY']}" == true ]; then
    RELATIVE_PATHS="/"
fi

#Get the base href (if present) from index.html i.e '/'
hostedPath=$(getExpectedHostedPath "${args['SOURCE_DIR']}/index.html")

#What dir we are going to serve so we can get to http://localhost:3000/c/demo
HOST_DIR="$SCRIPT_DIR/lhci"

#Where we are going to copy it to to mimic under `serve` command
TEST_DIR="$HOST_DIR""$hostedPath"

[ -d "$TEST_DIR" ] && [ "$TEST_DIR" != '/' ] && rm -rf "$TEST_DIR"
PARENT_DIR=$(dirname "$TEST_DIR") #Create the parent dir only
mkdir -p "$PARENT_DIR"
cp -rf "${args['SOURCE_DIR']}" "$TEST_DIR"

#Take each path & prefix '--url $base-href'
CMD_URLS=$(echo "$RELATIVE_PATHS" | while read -r htmlPath; do echo " --url $hostedPath/$htmlPath"; done)
#Replace any '//' for '/' & repeat incase some were '///', remove the newline characters for the cli
LHCI_URLS=$(echo "$CMD_URLS" | sed 's/\/\//\//g' | sed 's/\/\//\//g' | tr -d '\n')

yarn run lhci healthcheck --config="${args['LIGHTHOUSE_CONFIG']}" || abort "lhci healthcheck failed!"

yarn run lhci collect --config="${args['LIGHTHOUSE_CONFIG']}" --collect.staticDistDir="$HOST_DIR" "$LHCI_URLS" || abort "lhci healthcheck failed!"

yarn run lhci assert --config="${args['LIGHTHOUSE_CONFIG']}" || abort "lhci healthcheck failed!"

if [ -n "${args['OUTPUT_DIR']}" ]; then
    [ -d "${args['OUTPUT_DIR']}" ] && rm -rf "${args['OUTPUT_DIR']}"
    mkdir -p "${args['OUTPUT_DIR']}"
    mv "$PROJECT_DIR/.lighthouseci" "${args['OUTPUT_DIR']}"
fi

rm -rf "$HOST_DIR"

echo "Lighthouse complete"

exit 0
