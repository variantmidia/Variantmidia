$ErrorActionPreference = "Stop"

$repoRoot = "D:\Variantmidia\variantmidia"
$routeFile = Join-Path $repoRoot "app\proposta\saraiva-amaral\page.tsx"
$htmlFile = Join-Path $repoRoot "public\propostas\saraiva-amaral\index.html"

Set-Location $repoRoot

$removed = $false

if (Test-Path $routeFile) {
  Remove-Item -LiteralPath $routeFile -Force
  $removed = $true
}

if (Test-Path $htmlFile) {
  Remove-Item -LiteralPath $htmlFile -Force
  $removed = $true
}

if (-not $removed) {
  Write-Output "Nenhum arquivo da proposta estava presente."
  exit 0
}

git add --update -- "app/proposta/saraiva-amaral/page.tsx" "public/propostas/saraiva-amaral/index.html"

$status = git status --short -- "app/proposta/saraiva-amaral/page.tsx" "public/propostas/saraiva-amaral/index.html"
if (-not $status) {
  Write-Output "Nenhuma mudanca pendente para commit."
  exit 0
}

git commit -m "Remove Saraiva Amaral proposal pages"
git push origin main

Write-Output "Proposta removida e alteracoes publicadas."
