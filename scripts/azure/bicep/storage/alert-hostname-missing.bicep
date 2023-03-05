/* Alert when the hostname is unavailable */
targetScope = 'resourceGroup'

@description('Id of action group to notify on alerts')
param actionGroupId string

@description('Resource tags')
param tags object = {}

resource alertModule 'microsoft.insights/activityLogAlerts@2020-10-01' = {
  name: 'al-HostnameMissing'
  location: 'Global'
  properties: {
    scopes: [
      resourceGroup().id
    ]
    condition: {
      allOf: [
        {
          field: 'category'
          equals: 'Administrative'
        }
        {
          field: 'operationName'
          equals: 'Microsoft.Cdn/profiles/CheckHostNameAvailability/action'
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
  }
  tags: tags
}

output alert object = union(alertModule, { id: alertModule.id })
