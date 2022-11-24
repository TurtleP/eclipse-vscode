import { window, workspace, commands, ExtensionContext, OutputChannel } from 'vscode';
import { basename, resolve } from 'path';

import { spawnSync } from 'child_process';
const gulp = require('gulp');
const gulpIgnore = require('gulp-ignore');

function copyOtherFiles(cwd: string, includePatterns: ReadonlyArray<string>, ignorePatterns: ReadonlyArray<string>, output: string) {
    var gulpData = gulp.src(`${cwd}/**/*.*(${includePatterns.join('|')})`);

    gulpData.pipe(gulpIgnore.exclude('*.yue'))
        .pipe(gulpIgnore.exclude(output));

    ignorePatterns.forEach((value: string) => {
        gulpData.pipe(gulpIgnore.exclude(value));
    });

    return gulpData.pipe(gulp.dest(output));
}

function getConfigItem<T>(name: string) {
    return workspace.getConfiguration('eclipse').get(name) as T;
}

export function activate(context: ExtensionContext) {
    const output: OutputChannel = window.createOutputChannel("Eclipse");
    output.show();


    let disposable = commands.registerCommand('eclipse.build', () => {
        const editor = window.activeTextEditor;

        /* if no workspace or folder file is opened, we return and show an error */
        if (!editor || !workspace.workspaceFolders) {
            window.showErrorMessage('No workspace or workspace/folder file opened.');
            return null;
        }


        const resource = editor.document.uri;


        /* settings variables */
        const compactLuaCode = getConfigItem<boolean>('compactLuaCode') ? '-m' : '';
        const copyAltFiles = getConfigItem<boolean>('copyAltFiles');
        const saveStdoutOption = getConfigItem<boolean>('saveStdoutLog');
        const includePatterns = getConfigItem<Array<string>>('includePatterns');
        const ignorePatterns = getConfigItem<Array<string>>('ignorePatterns');
        const saveAll = getConfigItem<boolean>('saveOnCompile');
        const useSpaces = getConfigItem<string>('useTabsOrSpaces') === 'spaces' ? '-s' : '';
        const yuescriptPath = getConfigItem<string>('yuescriptPath');

        if (resource.scheme === 'file') {
            const root = workspace.getWorkspaceFolder(resource);

            if (!root) {
                window.showErrorMessage(`<outside workspace> → ${basename(resource.fsPath)}`);
            } else {
                if (saveAll) {
                    workspace.saveAll();
                }

                const rootAbsolute = resolve(root.uri.path);

                const sourceDirectory: string = rootAbsolute + "/" + getConfigItem<string>('sourceDirectory');
                const outputDirectory: string = rootAbsolute + "/" + getConfigItem<string>('outputDirectory');

                var args = [useSpaces, compactLuaCode, '-t', outputDirectory, sourceDirectory];

                if (!useSpaces) {
                    const spacesIndex = args.indexOf(useSpaces);
                    args.splice(spacesIndex, 1);
                }

                if (!compactLuaCode) {
                    const compactLuaCodeIndex = args.indexOf(compactLuaCode);
                    args.splice(compactLuaCodeIndex, 1);
                }

                const process = spawnSync(yuescriptPath, args);

                if (saveStdoutOption) {
                    output.clear();

                    const stdout = String(process.stdout).split('\r\n');
                    stdout.forEach((value: string) => {
                        output.appendLine(value);
                    });
                }

                if (process.status !== 0) {
                    window.showErrorMessage(`Failed to build project.`);
                    return null;
                }

                if (copyAltFiles) {
                    copyOtherFiles(sourceDirectory, includePatterns, ignorePatterns, outputDirectory);
                }
            }
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }