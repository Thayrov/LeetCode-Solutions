<#
.SYNOPSIS
  Create a new LeetCode solution file in the specified difficulty folder.

.DESCRIPTION
  Scaffolds a .ts file under problems\<easy|medium|hard> with a Typescript comment stub.

.PARAMETER Folder
  The difficulty folder: easy, medium, or hard.

.PARAMETER Number
  The LeetCode problem number (will become Number.ts).

.EXAMPLE
  .\create.ps1 easy 2900
#>

param(
    [Parameter(Mandatory=$true, Position=0)]
    [ValidateSet('easy','medium','hard')]
    [string]$Folder,

    [Parameter(Mandatory=$true, Position=1)]
    [int]$Number
)

function New-LeetCodeFile {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Folder,

        [Parameter(Mandatory)]
        [int]$Number
    )

    # Base folder (assumes script lives in LeetCode-Solutions root)
    $basePath = Join-Path $PSScriptRoot 'problems'
    $targetDir = Join-Path $basePath $Folder

    if (-not (Test-Path $targetDir)) {
        Write-Error "❌ Folder not found: $targetDir"
        return
    }

    $fileName = "$Number.ts"
    $filePath = Join-Path $targetDir $fileName

    if (Test-Path $filePath) {
        Write-Host "✔ File already exists: $filePath"
    }
    else {
        # create file with Typescript stub
        $stub = @"
/*

</> Typescript code:
*/
"@
        # Write stub to file
        $stub | Set-Content -Path $filePath -Encoding utf8NoBOM
        Write-Host "➤ Created with stub: $filePath"
    }
}

# If invoked directly, run function
if ($PSCommandPath -and ($MyInvocation.InvocationName -like '*.ps1')) {
    New-LeetCodeFile -Folder $Folder -Number $Number
}
