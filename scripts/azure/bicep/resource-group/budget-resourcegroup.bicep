/* https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.consumption/create-budget-onefilter/main.bicep */
targetScope = 'resourceGroup'

param resourceGroupName string

@description('Name of the Budget. It should be unique within a resource group.')
param budgetName string = 'BudgetAlert-${resourceGroupName}'

@description('The total amount of cost or usage to track with the budget')
param amount int = 100

@description('The time covered by a budget. Tracking of the amount will be reset based on the time grain.')
@allowed([
  'Monthly'
  'Quarterly'
  'Annually'
])
param timeGrain string = 'Monthly'

@description('The start date must be first of the month in YYYY-MM-DD format. Future start date should not be more than three months. Past start date should be selected within the timegrain period.')
param startDate string = utcNow('yyyy-MM-01') /* 1st of current month by default */

@description('The end date for the budget in YYYY-MM-DD format.')
param endDate string = '2033-01-01'

@description('When to notify the cost exceeded the threshold. Default = 90%')
param firstThreshold int = 90

@description('When to notify the cost exceeded the threshold, Default = 110%')
param secondThreshold int = 110

@description('The list of email addresses to send the budget notification to when the threshold is exceeded.')
param contactEmail string

@description('The set of values for the resource group filter.')
param resourceGroupFilterValues array = [
  resourceGroupName
]

resource budgetModule 'Microsoft.Consumption/budgets@2021-10-01' = {
  name: budgetName
  properties: {
    timePeriod: {
      /* You cannot update the startDate for an existingBudget, */
      startDate: startDate
      endDate: endDate
    }
    timeGrain: timeGrain
    amount: amount
    category: 'Cost'
    notifications: {
      NotificationForExceededBudget1: {
        enabled: true
        operator: 'GreaterThan'
        threshold: firstThreshold
        contactEmails: [
          contactEmail
        ]
      }
      NotificationForExceededBudget2: {
        enabled: true
        operator: 'GreaterThan'
        threshold: secondThreshold
        contactEmails: [
          contactEmail
        ]
      }
    }
    filter: {
      dimensions: {
        name: 'ResourceGroupName'
        operator: 'In'
        values: resourceGroupFilterValues
      }
    }
  }
}

output budget object = union(budgetModule, { id: budgetModule.id })
