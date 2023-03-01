### Azure

1. Create a new subscription & update scripts/azure/parameters\*.json with new subscription id
2. `az ad sp create-for-rbac --name "urlshortner-ci" --role contributor --scopes /subscriptions/%SUBSCRIPTION_ID%`

3. Follow the steps here: https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure?tabs=azure-portal%2Clinux#use-the-azure-login-action-with-a-service-principal-secret
   for setting up service principal secret
