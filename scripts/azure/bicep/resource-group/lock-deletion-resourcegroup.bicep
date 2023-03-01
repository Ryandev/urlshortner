/* https://github.com/Azure/azure-quickstart-templates/blob/master/subscription-deployments/create-rg-lock-role-assignment/main.bicep */

targetScope = 'resourceGroup'

resource lockDeletion 'Microsoft.Authorization/locks@2016-09-01' = {
  name: 'DontDelete'
  properties: {
    level: 'CanNotDelete'
    notes: 'Prevent deletion of the resourceGroup'
  }
}

output lockDeletion object = union(lockDeletion, { id: lockDeletion.id })
