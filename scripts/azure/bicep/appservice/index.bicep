@description('name')
param name string = 'AppService-${uniqueString(resourceGroup().id)}'

@description('Resource tags')
param tags object = {}

@description('Action group ID for service health issues')
param actionGroupId string = ''

module appServicePlan './appserviceplan.bicep' = {
  name: 'asp-${name}'
}

output appServicePlan object = appServicePlan.outputs.appServicePlan

module appService './appservice.bicep' = {
  name: name
  dependsOn: [ appServicePlan ]
  params: {
    name: name
    appServicePlanId: appServicePlan.outputs.appServicePlan.id
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
