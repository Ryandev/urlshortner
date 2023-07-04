targetScope = 'resourceGroup'

@description('The db name')
param name string = 'db-${uniqueString(resourceGroup().id)}'

@description('Deployemnt location')
param location string = resourceGroup().location

@allowed([ 'DocumentDB', 'MongoDB' ])
param apiInterface string = 'MongoDB'

@description('Resource tags')
param tags object = {}

@description('Enable Microsoft defender')
param enableThreatDetection bool = false

module db './db.bicep' = {
  name: 'db-${name}'
  params: {
    apiInterface: apiInterface
    location: location
    tags: tags
  }
}

module defender './defender.bicep' = if (enableThreatDetection) {
  name: 'defender-${name}'
  params: {
    dbName: name
  }
}

output db object = db.outputs.db
output defender object = enableThreatDetection ? defender.outputs.defender : {}
