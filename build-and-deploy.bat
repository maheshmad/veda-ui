cd ./WebContent/js
sencha app build
xcopy /E/I/S/Y "./build/production/Xedu" "C:\Apache\Apache24\htdocs\xedu"
xcopy /E/I/S/Y "../js2" "C:\Apache\Apache24\htdocs\xedu\js2"
cd ../..