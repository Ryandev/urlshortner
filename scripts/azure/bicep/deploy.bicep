targetScope = 'subscription'

@description('Name of containing resource group')
param resourceGroupName string

@description('Deployment location')
param location string = 'westeurope'

@description('Budget amount, after which email sent to action group')
param budget int = 50

@description('Where to email issues to ')
param contactEmail string

@description('Resource tags')
param tags object = {}

module resourceGroupModule './resource-group/index.bicep' = {
  name: resourceGroupName
  params: {
    name: resourceGroupName
    contactEmail: contactEmail
    budget: budget
    location: location
    tags: tags
  }
  scope: subscription()
}

resource resourceGroup 'Microsoft.Resources/resourceGroups@2022-09-01' existing = {
  name: resourceGroupName
}

module storageModule './storage/index.bicep' = {
  name: 'storage-${resourceGroupName}'
  scope: resourceGroup
  dependsOn: [ resourceGroup ]
  params: {
    name: 'saweb-${uniqueString(resourceGroup.id)}'
    location: location
    actionGroupId: resourceGroupModule.outputs.actionGroup.id
    tags: tags
  }
}

module appServiceModule './appservice/index.bicep' = {
  name: 'as-${resourceGroupName}'
  scope: resourceGroup
  dependsOn: [ resourceGroupModule ]
  params: {
    actionGroupId: resourceGroupModule.outputs.actionGroup.id
    tags: tags
  }
}

output resourceGroup object = resourceGroupModule

output storage object = storageModule

output appService object = appServiceModule
