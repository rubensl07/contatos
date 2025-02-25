@echo off

echo Verificando e criando o banco de dados...
php Back-end\config\criar_banco.php

echo Iniciando o backend...
start cmd /k "cd Back-end && php -S localhost:8000"

echo Iniciando o frontend...
start cmd /k "cd Front-end && php -S localhost:8001"