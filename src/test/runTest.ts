import * as path from 'path';
import * as cp from 'child_process';
import { runTests, downloadAndUnzipVSCode, resolveCliPathFromVSCodeExecutablePath } from 'vscode-test';

(async () => {
    try {
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');

        // The path to the extension test script
        // Passed to --extensionTestsPath
        const extensionTestsPath = path.resolve(__dirname, './suite/index');

        // Download VS Code and unzip it
        const vscodeExecutablePath = await downloadAndUnzipVSCode('');
        const launchArgs = ['--user-data-dir', '/tmp/data'];

        const cliPath = resolveCliPathFromVSCodeExecutablePath(vscodeExecutablePath);

        // Install vscode-java extension to downloaded vscode
        cp.spawnSync(cliPath, ['--user-data-dir', '/tmp/data', '--install-extension', 'redhat.java'], {
            encoding: 'utf-8',
            stdio: 'inherit'
        });

        // run the integration test
        await runTests({ vscodeExecutablePath, extensionDevelopmentPath, extensionTestsPath, launchArgs });
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
})();