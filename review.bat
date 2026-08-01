@echo off
echo Pulling latest drafts from GitHub...
git pull
echo.
echo Starting review server...
cd pipeline
start python review_server.py
timeout /t 2 /nobreak >nul
start http://localhost:5050
