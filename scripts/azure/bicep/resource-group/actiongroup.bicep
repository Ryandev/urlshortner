@description('Email address on alerts')
param contactEmail string

@description('Name of action group')
param alertGroupName string = 'AlertGroup'

@description('Name of action group')
param shortName string = 'al-alert'

@description('Resource tags')
param tags object = {}

resource actionGroup 'microsoft.insights/actionGroups@2021-09-01' = {
  name: alertGroupName
  location: 'Global'
  properties: {
    groupShortName: substring('${shortName}____________', 0, 12) /* 12 char limit, append 12 chars incase shorter than 12 */
    enabled: true
    emailReceivers: [
      {
        name: 'email-${contactEmail}'
        emailAddress: contactEmail
        useCommonAlertSchema: false
      }
    ]
    smsReceivers: []
    webhookReceivers: []
    eventHubReceivers: []
    itsmReceivers: []
    azureAppPushReceivers: []
    automationRunbookReceivers: []
    voiceReceivers: []
    logicAppReceivers: []
    azureFunctionReceivers: []
    armRoleReceivers: []
  }
  tags: tags
}

output actionGroup object = union(actionGroup, { id: actionGroup.id })
