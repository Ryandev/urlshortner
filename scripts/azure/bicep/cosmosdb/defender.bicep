targetScope = 'resourceGroup'

@description('The db name')
param dbName string

resource db 'Microsoft.DocumentDb/databaseAccounts@2023-03-15-preview' existing = {
  name: dbName
}

resource defender 'Microsoft.Security/advancedThreatProtectionSettings@2019-01-01' = {
  scope: db
  name: 'current'
  properties: {
    isEnabled: true
  }
}

output defender object = union(defender, { id: defender.id })
