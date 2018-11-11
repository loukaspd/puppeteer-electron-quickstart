import os from 'os';
import fs from 'fs';
import path from 'path';

export class FilePaths {
    constructor(logger, appFolderName) {
        if (!appFolderName) throw new Error('FilePaths: application folder name not specified');
        this.appFolderName = appFolderName;

        const appFolderPath = this.appFolderPath();
        if (!fs.existsSync(appFolderPath)) {
            try {
                fs.mkdirSync(appFolderPath);
            } catch(e) {
                logger.logError(`error while creating directory ${appFolderPath} \n ${e}`);
            }
            
            logger.logInfo(`created folder ${appFolderPath}`);
        }else {
            logger.logInfo(`using folder ${appFolderPath}`);
        }
    }

    appFolderPath() {
        const documentsPath = path.join(os.homedir(), "Documents");

        return path.join(documentsPath, this.appFolderName);
    }

    dbFilePath() {
        return path.join(this.appFolderPath(), 'database.db');
    }

    csvFilePath() {
        return path.join(this.appFolderPath(), 'Courses.csv');
    }

    settingsPath() {
        return path.join(this.appFolderPath(), 'settings.json');
    }

    logsPath() {
        return path.join(this.appFolderPath(), 'logs.txt');
    }
}