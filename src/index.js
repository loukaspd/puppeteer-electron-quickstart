//#region Imports
// Library ----------------------------------------------------------------------------------
import { Logger } from './lib/logger';
import { FilePaths } from './lib/file-paths.js';
import { PuppeteerWrapper } from './lib/puppeteer-wrapper';


//#endregion

//#region Setup - Dependency Injection-----------------------------------------------
const _logger = new Logger();
const _filePaths = new FilePaths(_logger, "puppeteer-electron-quickstart");
const _puppeteerWrapper = new PuppeteerWrapper(_logger, _filePaths);

//#endregion

//#region Main ----------------------------------------------------------------------

async function main() {
    /* main code
    ... 
    const page =  _puppeteerWrapper.newPage();
    await page.goto('https:/www.google.com');
    ...
    */
}

(async () => {
    try {
        const chromeSet = await _puppeteerWrapper.setup({ headless: true });
        if (!chromeSet) {
            return;
        }

        await main();
    } catch(e) {
        _logger.logError('Thrown error:');
        _logger.logError(e);
    } finally {
        await _puppeteerWrapper.cleanup();
    }

    _logger.logInfo('Done. Close window to exit');

    await _logger.exportLogs(_filePaths.logsPath());
})();

//#endregion