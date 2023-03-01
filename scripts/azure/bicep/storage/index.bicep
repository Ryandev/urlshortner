/* Taken from: https://github.com/Azure/azure-quickstart-templates/blob/master/quickstarts/microsoft.cdn/front-door-standard-premium-storage-static-website/modules/storage-static-website.bicep */

@description('Resource deployment location')
param location string = resourceGroup().location

@description('Storage account name to create. Must be unique')
param name string = 'sa-${uniqueString(resourceGroup().id)}'

@description('The name of the SKU to use when creating the Azure Storage account.')
@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_ZRS'
  'Standard_GZRS'
  'Premium_LRS'
  'Premium_ZRS'
])
param storageType string = 'Standard_LRS'

@description('index.html path')
param indexDocumentPath string = 'index.html'

@description('404 html path')
param errorDocumentPath string = '404.html'

@description('Resource tags')
param tags object = {}

@description('Action group ID for service health issues')
param actionGroupId string = ''

var storageAccountName = replace(replace(replace(replace(name, '=', ''), '_', ''), '-', ''), ' ', '')

/* create storage account */
module storageModule './storage.bicep' = {
  name: name
  params: {
    location: location
    storageType: storageType
    accountName: storageAccountName
    tags: tags
  }
}

output storage object = storageModule.outputs.storage

/* enable website url for storage */
module websiteModule './enable-website-on-storage.bicep' = {
  name: 'website-${name}'
  dependsOn: [ storageModule ]
  scope: resourceGroup()
  params: {
    location: location
    storageAccountName: storageAccountName
    indexDocumentPath: indexDocumentPath
    errorDocument404Path: errorDocumentPath
    tags: tags
  }
}

output website object = websiteModule.outputs.website

module alertHostnameMissingModule './alert-hostname-missing.bicep' = if (actionGroupId != '') {
  name: 'al-hostNameMissing-${name}'
  params: {
    actionGroupId: actionGroupId
    tags: tags
  }
}

output alertHostnameMissing object = alertHostnameMissingModule.outputs.alert

module alertServiceHealthModule './alert-servicehealth.bicep' = if (actionGroupId != '') {
  name: 'al-serviceHealth-${name}'
  params: {
    actionGroupId: actionGroupId
    tags: tags
  }
}

output alertServiceHealth object = alertServiceHealthModule.outputs.alertHealth
