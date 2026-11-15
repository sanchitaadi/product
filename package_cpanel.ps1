# ========================================================
# Peachy Plate 2.0 — Automated cPanel Release Packager
# ========================================================
$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$frontendDir = Join-Path $root "frontend"
$outDir = Join-Path $frontendDir "out"
$sharedDir = Join-Path $root "shared"
$databaseDir = Join-Path $root "database"
$htaccessFile = Join-Path $root "public_html\.htaccess"
$buildDir = Join-Path $root "build_cpanel"
$zipOutput = Join-Path $root "peachy_plate_2.0_cpanel.zip"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  PEACHY PLATE 2.0 - CPANEL PACKAGER     " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Clean previous builds
if (Test-Path $buildDir) {
    Write-Host "[1/5] Cleaning existing build_cpanel folder..." -ForegroundColor Yellow
    Remove-Item -Path $buildDir -Recurse -Force
}
if (Test-Path $zipOutput) {
    Remove-Item -Path $zipOutput -Force
}

New-Item -ItemType Directory -Path $buildDir | Out-Null

# 2. Check or build Next.js static export
if (-not (Test-Path $outDir)) {
    Write-Host "[2/5] Running Next.js static export build..." -ForegroundColor Yellow
    Push-Location $frontendDir
    npm run build
    Pop-Location
} else {
    Write-Host "[2/5] Using verified static export in frontend/out..." -ForegroundColor Green
}

# 3. Copy Static Frontend Export
Write-Host "[3/5] Copying Next.js static export to build root..." -ForegroundColor Yellow
Copy-Item -Path "$outDir\*" -Destination $buildDir -Recurse -Force

# 4. Copy Backend PHP APIs, Configuration & Assets
Write-Host "[4/5] Copying PHP REST API layer & database schemas..." -ForegroundColor Yellow
$destShared = Join-Path $buildDir "shared"
if (-not (Test-Path $destShared)) { New-Item -ItemType Directory -Path $destShared | Out-Null }
Copy-Item -Path "$sharedDir\*" -Destination $destShared -Recurse -Force

$destDb = Join-Path $buildDir "database"
if (-not (Test-Path $destDb)) { New-Item -ItemType Directory -Path $destDb | Out-Null }
Copy-Item -Path "$databaseDir\database.sql" -Destination $destDb -Force

# Copy .htaccess
Copy-Item -Path $htaccessFile -Destination (Join-Path $buildDir ".htaccess") -Force

# 5. Compress into deployment ZIP
Write-Host "[5/5] Compressing production archive: peachy_plate_2.0_cpanel.zip..." -ForegroundColor Yellow
Compress-Archive -Path "$buildDir\*" -DestinationPath $zipOutput -CompressionLevel Optimal

$zipInfo = Get-Item $zipOutput
$zipSizeMb = [Math]::Round($zipInfo.Length / 1MB, 2)

Write-Host "`nSUCCESS! cPanel Deployment Package Ready!" -ForegroundColor Green
Write-Host "Archive: $zipOutput ($zipSizeMb MB)" -ForegroundColor Green
Write-Host "Deployment: Upload and extract directly into cPanel public_html/" -ForegroundColor Cyan
