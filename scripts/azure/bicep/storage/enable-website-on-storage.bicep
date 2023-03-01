/* https://github.com/Azure/azure-quickstart-templates/blob/master/quickstarts/microsoft.cdn/front-door-standard-premium-storage-static-website/modules/storage-static-website.bicep */

@description('Storage Account Name to enable website on')
param storageAccountName string

@description('Deployemnt location')
param location string = resourceGroup().location

@description('Default document html path')
param indexDocumentPath string = 'index.html'

@description('404 document html path')
param errorDocument404Path string = 'error.html'

@description('Resource tags')
param tags object = {}

var storageAccountContributorRoleDefinitionId = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '17d1049b-9a84-46fb-8f53-869881c3d3ab') // as per https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#:~:text=17d1049b-9a84-46fb-8f53-869881c3d3ab
var storageAccountStorageBlobDataContributorRoleDefinitionId = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'ba92f5b4-2d11-453d-a403-e96b0029c9fe') // as per https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#:~:text=ba92f5b4-2d11-453d-a403-e96b0029c9fe
var managedIdentityName = 'iam-${storageAccountName}-StorageStaticWebsiteEnabler'
var deploymentScriptName = 'script-${storageAccountName}-EnableStorageStaticWebsite'

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-04-01' existing = {
  name: storageAccountName
}

/* Create managed identity with roles, needed for script execution */
resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' = {
  name: managedIdentityName
  location: location
}

resource roleAssignmentContributor 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  scope: storageAccount
  name: guid(resourceGroup().id, managedIdentity.id, storageAccountContributorRoleDefinitionId)
  properties: {
    roleDefinitionId: storageAccountContributorRoleDefinitionId
    principalId: managedIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

resource roleAssignmentStorageBlobDataContributor 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  scope: storageAccount
  name: guid(resourceGroup().id, managedIdentity.id, storageAccountStorageBlobDataContributorRoleDefinitionId)
  properties: {
    roleDefinitionId: storageAccountStorageBlobDataContributorRoleDefinitionId
    principalId: managedIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

/* Execute script under IAM to enable $web container */
resource deploymentScript 'Microsoft.Resources/deploymentScripts@2020-10-01' = {
  name: deploymentScriptName
  location: location
  kind: 'AzurePowerShell'
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
  dependsOn: [
    roleAssignmentContributor
    roleAssignmentStorageBlobDataContributor
  ]
  properties: {
    azPowerShellVersion: '5.4'
    scriptContent: loadTextContent('./enable-storage-static-website.ps1')
    cleanupPreference: 'OnSuccess'
    retentionInterval: 'P1D'
    arguments: '-ResourceGroupName ${resourceGroup().name} -StorageAccountName ${storageAccountName} -IndexDocument ${indexDocumentPath} -ErrorDocument404Path ${errorDocument404Path}'
    timeout: 'PT30M'
  }
  tags: tags
}

output website object = {
  endPoint: storageAccount.properties.primaryEndpoints.web
  hostName: replace(replace(storageAccount.properties.primaryEndpoints.web, 'https://', ''), '/', '')
  indexHtml: indexDocumentPath
  errorHtml: errorDocument404Path
}
