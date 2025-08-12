@echo off
cd /d D:\Wipro_Training

:: Stage all changes
git add .

:: Commit with a default message (you can replace this or pass it as %1)
git commit -m "Updated files"

:: Push to main branch
git push origin main

pause
