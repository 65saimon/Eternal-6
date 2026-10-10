@echo off
echo ==============================================
echo Pushing Eternal-6 to GitHub (65saimon/Eternal-6)
echo ==============================================
cd /d "c:\Users\ahsan\.antigravity-ide\Eternal-6"
git push -u origin master
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==============================================
    echo SUCCESS! Eternal-6 is pushed to GitHub!
    echo URL: https://github.com/65saimon/Eternal-6
    echo ==============================================
) else (
    echo.
    echo ==============================================
    echo Push failed! Please make sure you created the
    echo repo at https://github.com/new with name: Eternal-6
    echo ==============================================
)
pause
