### Github-Azure

1. Create a new subscription & update scripts/azure/parameters\*.json with new subscription id

2. Run script below to generate service principal & access code for github actions. Set JSON output as 'secrets.AZURE_CREDENTIALS' on Github
   (Based on steps from: https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure?tabs=azure-portal%2Clinux#use-the-azure-login-action-with-a-service-principal-secret)

```
SUBSCRIPTION_ID='ADD_HERE'
TENANT_ID=$(az account show | jq -cre '.id')
ADAPP=$(az ad sp create-for-rbac --name "urlshortner-ci" --role contributor --scopes /subscriptions/$SUBSCRIPTION_ID)
APP_ID=$(echo "$ADAPP" | jq -cre '.appId')
APP_PW=$(echo "$ADAPP" | jq -cre '.password')
az ad app credential list "$APP_ID"

echo '---AZURE_SECRET JSON Credentials----'
echo "{
    \"clientSecret\": \"$APP_PW\",
    \"subscriptionId\": \"$SUBSCRIPTION_ID\",
    \"clientId\": \"$APP_ID\",
    \"tenantId\": \"$TENANT_ID\"
}"
```
