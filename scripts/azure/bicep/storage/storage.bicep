targetScope = 'resourceGroup'

@description('Storage Account type')
@allowed([
  'Premium_LRS'
  'Premium_ZRS'
  'Standard_GRS'
  'Standard_GZRS'
  'Standard_LRS'
  'Standard_RAGRS'
  'Standard_RAGZRS'
  'Standard_ZRS'
])
param storageType string = 'Standard_LRS'

@description('Resource location')
param location string = resourceGroup().location

@description('Name of storage account. Must be globally unique.')
param accountName string = 'sa-${uniqueString(resourceGroup().id)}'

@description('Resource tags')
param tags object = {}

resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: accountName
  location: location
  tags: tags
  sku: {
    name: storageType
  }
  kind: 'StorageV2'
  properties: {
    dnsEndpointType: 'Standard'
    defaultToOAuthAuthentication: false
    publicNetworkAccess: 'Enabled'
    allowCrossTenantReplication: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: true
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      requireInfrastructureEncryption: false
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

output storage object = union(storageAccount, { id: storageAccount.id })
