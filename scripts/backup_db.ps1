# scripts/backup_db.ps1
# Script de Backup Automatizado do Banco de Dados PostgreSQL para FJ Elite Motors

# Configurações
$DB_NAME = "fjelitemotors"
$DB_USER = "johndoe"
$DB_HOST = "localhost"
$DB_PORT = "5432"
$BACKUP_PATH = "C:\Users\Dec\Documents\John\FJ Elite Motors\backups"
$DATE = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$BACKUP_FILE = "$BACKUP_PATH\backup_$DB_NAME_$DATE.sql"

# Garantir que o diretório de backup existe
if (-not (Test-Path $BACKUP_PATH)) {
    New-Item -ItemType Directory -Path $BACKUP_PATH
    Write-Host "Diretório de backup criado em: $BACKUP_PATH" -ForegroundColor Green
}

Write-Host "Iniciando backup do banco de dados $DB_NAME..." -ForegroundColor Yellow

# Executa o pg_dump (necessário ter o PostgreSQL bin no PATH)
try {
    & pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f $BACKUP_FILE
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Backup concluído com sucesso!" -ForegroundColor Green
        Write-Host "Arquivo: $BACKUP_FILE" -ForegroundColor Cyan
    } else {
        Write-Host "Erro ao realizar backup. Verifique se o pg_dump está no PATH e se as credenciais estão corretas." -ForegroundColor Red
    }
} catch {
    Write-Host "Ocorreu um erro inesperado: $_" -ForegroundColor Red
}

# Limpeza opcional: manter apenas os últimos 7 backups
# Get-ChildItem -Path $BACKUP_PATH -Filter "backup_$DB_NAME_*.sql" | Sort-Object CreationTime -Descending | Select-Object -Skip 7 | Remove-Item
