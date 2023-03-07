targetScope = 'resourceGroup'

@description('The name of the app service plan resource')
param name string = 'asp-AppServicePlan'

@description('Resource deployment location')
param location string = resourceGroup().location

@description('The number of instances to deploy')
param instances int = 1

@description('The name of the SKU to use when creating the App Service plan')
@allowed([
  'B1'
  'B2'
  'B3'
  'D1'
  'F1'
  'FREE'
  'I1'
  'I1v2'
  'I2'
  'I2v2'
  'I3'
  'I3v2'
  'P1V2'
  'P1V3'
  'P2V2'
  'P2V3'
  'P3V2'
  'P3V3'
  'PC2'
  'PC3'
  'PC4'
  'S1'
  'S2'
  'S3'
  'SHARED'
  'WS1'
  'WS2'
  'WS3'
])
param sku string = 'F1'

@description('OS of deployment')
@allowed([
  'linux'
  'windows'
])
param type string = 'linux'

@description('Is reserved instance')
param reserved bool = false

@description('Resource tags')
param tags object = {}

resource appServicePlanModule 'Microsoft.Web/serverFarms@2020-06-01' = {
  name: name
  location: location
  sku: {
    name: sku
    capacity: instances
  }
  kind: type
  properties: {
    /* linux *must* be reserved, use the param *if* possible
       ref: https://stackoverflow.com/questions/66520937/pulumi-azure-native-provider-azure-webapp-the-parameter-linuxfxversion-has-an */
    reserved: (type == 'linux' ? true : reserved)
  }
  tags: tags
}

output appServicePlan object = union(appServicePlanModule, { id: appServicePlanModule.id })
