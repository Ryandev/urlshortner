/* Ref: https://docs.microsoft.com/en-us/azure/service-health/service-health-notifications-properties */
targetScope = 'resourceGroup'

@description('Name of alert')
param name string = 'al-sa-HealthSubscription'

@description('ID of action group to notify on alerts')
param actionGroupId string

@description('Impacted Resource groups')
param impactedResourceGroups array = [
  'Global'
  resourceGroup().name
]

@description('Incident types')
@allowed([
  'ActionRequired'
  'Incident'
  'Maintenance'
  'Informational'
  'Security'
])
param incidentTypes array = [
  'ActionRequired'
  'Incident'
  'Maintenance'
  'Informational'
  'Security'
]

@description('Service resource type alerts')
param serviceTypes array = [
  'Storage'
]

@description('Resource tags')
param tags object = {}

var incidentTypesConditions = [for (incidentType, i) in incidentTypes: {
  field: 'properties.incidentType'
  equals: incidentType
}]

resource alertHealthModule 'microsoft.insights/activityLogAlerts@2020-10-01' = {
  name: name
  location: 'Global'
  properties: {
    scopes: [
      subscription().id
    ]
    condition: {
      allOf: [
        {
          field: 'category'
          equals: 'ServiceHealth'
        }
        {
          anyOf: incidentTypesConditions
        }
        {
          field: 'properties.impactedServices[*].ServiceName'
          containsAny: serviceTypes
        }
        {
          field: 'properties.impactedServices[*].ImpactedRegions[*].RegionName'
          containsAny: impactedResourceGroups
        }
      ]
    }
    actions: {
      actionGroups: [
        {
          actionGroupId: actionGroupId
          webhookProperties: {}
        }
      ]
    }
    enabled: true
    description: 'Service Health issue alerts'
  }

  tags: tags
}

output alertHealth object = union(alertHealthModule, { id: alertHealthModule.id })
