targetScope = 'subscription'

@description('Name of resource group')
param name string

@description('Email address to notify for budget/other issues')
param contactEmail string

@description('Resource deployment location')
param location string = 'westeurope'

@description('Budget value for resource group')
param budget int = 100

@description('Resource tags')
param tags object = {}

resource resourceGroupModule 'Microsoft.Resources/resourceGroups@2022-09-01' = {
  name: name
  location: location
  tags: tags
}

output resourceGroup object = union(resourceGroupModule, { id: resourceGroupModule.id })

module actionGroupModule './actiongroup.bicep' = {
  name: 'ag-recommendations-${name}'
  scope: resourceGroupModule
  params: {
    alertGroupName: 'Azure Advisor Alert ResourceGroup ${name}'
    shortName: 'al-advisor-${name}'
    contactEmail: contactEmail
    tags: tags
  }
}

output actionGroup object = actionGroupModule.outputs.actionGroup

module alertRecommendations './alert-recommendations.bicep' = {
  name: 'rg-recommendations-${name}'
  scope: resourceGroupModule
  params: {
    actionGroupId: actionGroupModule.outputs.actionGroup.id
    tags: tags
  }
}

output alertRecommendations object = alertRecommendations.outputs.alert

module alertBudget './budget-resourcegroup.bicep' = {
  name: 'al-budget-${name}'
  scope: resourceGroupModule
  params: {
    contactEmail: contactEmail
    amount: budget
    resourceGroupName: name
  }
}

output alertBudget object = alertBudget

module lockDeletionModule './lock-deletion-resourcegroup.bicep' = {
  name: 'lk-deletion-${name}'
  scope: resourceGroupModule
}

output lockDeletion object = lockDeletionModule.outputs.lockDeletion
