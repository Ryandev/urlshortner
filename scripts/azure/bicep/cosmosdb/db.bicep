targetScope = 'resourceGroup'

@description('The db name')
param name string = 'db-${uniqueString(resourceGroup().id)}'

@description('Deployemnt location')
param location string = resourceGroup().location

@allowed([ 'DocumentDB', 'MongoDB' ])
param apiInterface string = 'MongoDB'

@description('Resource tags')
param tags object = {}

@description('Apply free quota allowance')
param applyFreeTier bool = true

resource db 'Microsoft.DocumentDb/databaseAccounts@2023-03-15-preview' = {
  kind: apiInterface == 'MongoDB' ? 'MongoDB' : 'GlobalDocumentDB'
  name: name
  location: location
  properties: {
    databaseAccountOfferType: 'Standard'
    locations: [
      {
        id: '${name}-${location}'
        failoverPriority: 0
        locationName: location
      }
    ]
    backupPolicy: {
      type: 'Periodic'
      periodicModeProperties: {
        backupIntervalInMinutes: 240
        backupRetentionIntervalInHours: 8
        backupStorageRedundancy: 'Geo'
      }
    }
    isVirtualNetworkFilterEnabled: false
    virtualNetworkRules: []
    ipRules: []
    dependsOn: []
    minimalTlsVersion: 'Tls12'
    enableMultipleWriteLocations: false
    capabilities: [
      {
        name: 'EnableMongo'
      }
      {
        name: 'DisableRateLimitingResponses'
      }
    ]
    apiProperties: {
      serverVersion: '4.2'
    }
    enableFreeTier: applyFreeTier
    capacity: {
      totalThroughputLimit: 1000
    }
  }
  tags: union(tags, {
      defaultExperience: 'Azure Cosmos DB for ${apiInterface} API'
    })
}

output db object = union(db, { id: db.id })
