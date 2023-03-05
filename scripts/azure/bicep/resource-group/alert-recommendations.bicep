@description('ID of parent subscription')
param subscriptionId string = subscription().subscriptionId

@description('Name of parent resource to group under')
param resourceGroupName string = resourceGroup().name

@description('ID of action group to notify on alerts')
param actionGroupId string

@description('Resource tags')
param tags object = {}

resource alert 'microsoft.insights/activityLogAlerts@2020-10-01' = {
  name: 'rg-recommendations'
  location: 'Global'
  properties: {
    scopes: [
      subscription().id
    ]
    condition: {
      allOf: [
        {
          field: 'category'
          equals: 'Recommendation'
        }
        {
          field: 'operationName'
          equals: 'Microsoft.Advisor/recommendations/available/action'
        }
        {
          field: 'properties.recommendationCategory'
          equals: 'Cost'
        }
        {
          field: 'properties.recommendationImpact'
          equals: 'Medium'
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
    description: 'Azure Advisor Alert. Recommended changes for subscription:${subscriptionId} resource-group:${resourceGroupName}'
  }
  tags: tags
}

output alert object = union(alert, { id: alert.id })
