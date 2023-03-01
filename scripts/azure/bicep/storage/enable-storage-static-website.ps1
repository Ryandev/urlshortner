param (
    [string] $ResourceGroupName,
    [string] $StorageAccountName,
    [string] $IndexDocument,
    [string] $ErrorDocument404Path
)

$ErrorActionPreference = 'Stop'

Write-Output "Script instantiated with parameters: ResourceGroupName:$ResourceGroupName, StorageAccountName:$StorageAccountName, IndexDocument:$IndexDocument, ErrorDocument404Path:$ErrorDocument404Path"

$storageAccount = Get-AzStorageAccount -ResourceGroupName $ResourceGroupName -AccountName $StorageAccountName
$ctx = $storageAccount.Context

Write-Output "Enabling Enable-AzStorageStaticWebsite ctx:$ctx"

Enable-AzStorageStaticWebsite -Context $ctx -IndexDocument $IndexDocument -ErrorDocument404Path $ErrorDocument404Path

Write-Output "Setting index.html"
New-Item $IndexDocument -Force
Set-Content $IndexDocument '<h1>Welcome</h1>'
Set-AzStorageBlobContent -Force -Context $ctx -Container '$web' -File $IndexDocument -Blob $IndexDocument -Properties @{'ContentType' = 'text/html'}

Write-Output "Setting (404)error.html"
New-Item $ErrorDocument404Path -Force
Set-Content $ErrorDocument404Path '<h1>404: Error, Not Found</h1>'
Set-AzStorageBlobContent -Force -Context $ctx -Container '$web' -File $ErrorDocument404Path -Blob $ErrorDocument404Path -Properties @{'ContentType' = 'text/html'}