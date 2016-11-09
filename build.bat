SET BuildFolder=C:\Code\alexa-app-server\examples\apps\whoisright
SET NodeFolder=C:\Code\alexa-app-server\examples\apps\whoisright\node_modules

REM - Create the build folder if it doesn't exist
IF NOT EXIST %BuildFolder% (
    mkdir %BuildFolder% 
)

REM Copy Files - Overwrite if required
FOR %%I IN ("src\index.js" "src\intentHandler.js" "src\utility.js" "src\prompts.js" "package.json") DO xcopy %%I %BuildFolder% /Y

REM Copy Node_Modules - Don't overwrite if they EXIST
IF NOT EXIST %NodeFolder% (
    echo "node_modules doesn't exist!"
    mkdir %NodeFolder%
    if not errorlevel 1 (
       xcopy node_modules %NodeFolder% /s /v /e
    )
) 