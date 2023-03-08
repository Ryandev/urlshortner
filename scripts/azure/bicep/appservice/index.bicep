targetScope = 'resourceGroup'

@description('name')
param name string = 'AppService-${uniqueString(resourceGroup().id)}'

@description('Deployemnt location')
param location string = resourceGroup().location

@description('Resource tags')
param tags object = {}

@description('Action group ID for service health issues')
param actionGroupId string = ''

module appServicePlan './appserviceplan.bicep' = {
  name: 'asp-${name}'
  params: {
    location: location
    tags: tags
  }
}

output appServicePlan object = appServicePlan.outputs.appServicePlan

module appService './appservice.bicep' = {
  name: name
  dependsOn: [ appServicePlan ]
  params: {
    name: name
    appServicePlanId: appServicePlan.outputs.appServicePlan.id
    location: location
    tags: tags
  }
}

output appService object = appService.outputs.appService

module alertServiceHealth './alert-servicehealth.bicep' = if (actionGroupId != '') {
  name: 'al-serviceHealth-${name}'
  params: {
    actionGroupId: actionGroupId
    tags: tags
  }
}

output alertServiceHealth object = alertServiceHealth.outputs.alertHealth
