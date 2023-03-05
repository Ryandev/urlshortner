targetScope = 'resourceGroup'

@description('The app service name')
param name string

@description('Deployemnt location')
param location string = resourceGroup().location

@description('App Service Plan Id to deploy in')
param appServicePlanId string

/* azdeploy % az webapp list-runtimes --linux */
@description('The Runtime stack of current web app')
@allowed([
  'NODEJS|14-LTS'
  'NODEJS|16-LTS'
  'NODEJS|18-LTS'
])
param runtimeStack string = 'NODEJS|16-LTS'

@description('Restrict access by headers, not matching headers will result in 401')
param requestHeaderRestrictions array = []

@description('Resource tags')
param tags object = {}

var ipSecurityRestrictions = [for (requestHeader, i) in requestHeaderRestrictions: {
  tag: 'ServiceTag'
  ipAddress: (contains(requestHeader, 'ipAddress') ? requestHeader.ipAddress : '*')
  action: (contains(requestHeader, 'action') ? requestHeader.action : 'Allow')
  priority: (contains(requestHeader, 'priority') ? requestHeader.priority : 100)
  headers: {
    '${requestHeader.key}': [
      requestHeader.value
    ]
  }
  name: (contains(requestHeader, 'name') ? requestHeader.name : 'Allow traffic for kv: ${requestHeader.key}:${requestHeader.value}')
}]

resource appServiceModule 'Microsoft.Web/sites@2021-02-01' = {
  name: name
  location: location
  properties: {
    httpsOnly: true
    serverFarmId: appServicePlanId
    siteConfig: {
      detailedErrorLoggingEnabled: true
      httpLoggingEnabled: true
      requestTracingEnabled: true
      linuxFxVersion: runtimeStack
      minTlsVersion: '1.2'
      ftpsState: 'FtpsOnly'
      ipSecurityRestrictions: ipSecurityRestrictions
    }
  }
  identity: {
    type: 'SystemAssigned'
  }
  tags: tags
}

output appService object = union(appServiceModule, { id: appServiceModule.id })
