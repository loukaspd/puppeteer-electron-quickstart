# puppeteer-electron-quickstart

Quickstart project to run puppeteer library from an electron application. Using ES-6 and babel.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Package Manager

Yarn is the suggested package manager, since electron suggests it too.

### Installing

1. Clone the project
2. run yarn to download needed packages


## Project Info

### Electron application

1. [electron_main.js](electron_main.js): the main file that will run from our electron application
1. index.html: the UI of our electron application. 
    - Currently contains only the a div where all the logs will be shown
    - In this file we need to load all our custom js files. This is done from copy-babel-output npm script 

### Puppeteer
To run puppeteer inside electron we use puppeteer-core library, which uses chrome instance installed in the client machine.
Puppeteer is initialized in [puppeteer-wrapper.js](/src/lib/puppeteer-wrapper.js).  
1. The script is checking default chrome patch. Depending on the OS where the app is running this path will be:
    - for Windows: C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
    - for mac: /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
2. If the executable exists in another directory this has to be set in Documents/application-folder/settings.json


### Main Program

The main functionality is in src folder.  
[index.js](/src/index.js) is the starting point of our application.


### Helper libraries

1. [logger.js](/src/lib/logger.js)  
    simple logger that writes to our div in index.html file
2. [file-paths.js](/src/lib/file-paths.js)  
    - Source of truth about where all file paths the application is using. Using this library to avoid hardcoding file paths in different places
    - When application starts creates a folder inside user's Documents folder where all files will be saved


## package.json scripts

1. `babel_build`: converts all .js files inside src folder to es2015 in babel-output folder, so they can be required in index.html file without errors (electron uses es2015)
1. `copy-babel-output`: grabs all .js files from babel-output folder and adds a require for them in index.html
1. `start`: the main script to start the electron app. Call the two previous scripts before starting the app with the app-to-date code
1. `start_dev`: you can use this script in case you need to run the code from node and not inside an electron app
1. `dist`: script used to product an electron app installer inside the dist folder. Like start, this script calls the two first scripts to make sure the code is up to date before building the installer

## License
This project is licensed under The Unlicense - see the [LICENSE](LICENSE) file for details