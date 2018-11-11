import fs from 'fs';
export class Logger {
    constructor() {
        if (process.versions.electron) { 
            this._htmlLogger = document.getElementById('logger');
        }

        this._logs = [];
    }

    logInfo(msg) {
        this.log(msg);
    }

    logError(msg) {
        this.log(msg, 'color: red;')
    }

    log(msg, style) {
        if (!msg) return;
        
        if (this._htmlLogger) {
            this._htmlLogger
            .insertAdjacentHTML('beforeend', `\n <p style="${style || 'color: black;'}">${msg}</p>`);
            // Scroll to bottom
            this._htmlLogger.scrollTop = this._htmlLogger.scrollHeight;
        }else {
            console.log(msg);
        }

        this._logs.push(msg);
    }

    exportLogs(path) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, this._logs.join('\n'), (err) => {
                resolve();
            });
        });
    }
}