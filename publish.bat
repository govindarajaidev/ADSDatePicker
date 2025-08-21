@echo off
echo Building ADSDatePicker library...
npm run build:lib

echo Running tests...
rem npm test

echo Preparing for npm publish...
echo.
echo Please make sure you are logged into npm with 'npm login'
echo.
echo Version in package.json: 
findstr "version" package.json

set /p version="Enter version to publish (or press Enter to use the version in package.json): "

if "%version%"=="" (
  echo Publishing with version from package.json...
  npm publish
) else (
  echo Publishing as version %version%...
  npm version %version% --no-git-tag-version
  npm publish
)

echo.
echo If successful, your package is now available on npm!
echo https://www.npmjs.com/package/ads-date-picker
echo.
