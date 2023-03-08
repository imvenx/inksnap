import { ChildProcessWithoutNullStreams, exec as _exec, spawn } from "child_process";
import { promisify } from "util";
const exec = promisify(_exec);
import { promises as p, watchFile } from "fs"
import { dialog } from "electron";
import { ConfigH } from "./config_h";
import { AnimH } from "./anim_h";

export abstract class InkscapeH {

    static inkscapeProcess: ChildProcessWithoutNullStreams

    static async createNewProject() {
        try {

            const saveDialogResponse = await dialog.showSaveDialog({
                defaultPath: ConfigH.projectsPath,
                title: "Select new project path",
                properties: ['showOverwriteConfirmation'],
            })

            const directoryPath = saveDialogResponse.filePath
            if (!directoryPath) return

            try { await p.mkdir(directoryPath) }
            catch { dialog.showErrorBox('Error', "Project name repeated") }

            const filePath = `${directoryPath}/${directoryPath.split('/').pop()}.svg`

            await this.closeInkscape()

            await this.createSvg(filePath)

            ConfigH.setProjectPath(directoryPath)

            this.openInkscape(filePath)

            return true

        } catch (e) {
            console.log(e)
        }
    }

    static async setInkscapePath() {

        const path = (await dialog.showOpenDialog({
            properties: ['openFile'],
            title: "Select inkscape's path",
        })).filePaths[0]

        if (!path) return

        ConfigH.saveInkscapePath(path)
    }

    static async openInkscape(filePath: string) {

        try {

            const openSvgCommand = `${ConfigH.inkscapePath} "${filePath}"`
            // console.log(openSvgCommand)
            exec(openSvgCommand)
            // console.log('Open svg result: ', openSvgResult)

            this.inkscapeProcess = spawn(`${ConfigH.inkscapePath}`, ['-q', '--shell'])

            watchFile(filePath, { interval: 200 }, async (curr, prev) => {
                const fileContent = await p.readFile(filePath, { encoding: 'utf-8' })
                AnimH.updateCurrentFrame(fileContent)
            })


            InkscapeH.inkscapeProcess.stdin.write(`select-clear
        `)


            InkscapeH.inkscapeProcess.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            InkscapeH.inkscapeProcess.stderr.on('error', (err) => console.log('stderr: ', err))

            InkscapeH.inkscapeProcess.on('close', (code) => {
                console.log(`child process close all stdio with code ${code}`);
            });

            InkscapeH.inkscapeProcess.on('exit', (code) => {
                console.log(`child process exited with code ${code}`);
            });

            InkscapeH.inkscapeProcess.on('error', (err) => console.log('err: ', err))

            InkscapeH.inkscapeProcess.on('message', (msg) => console.log('msg: ', msg))
        } catch (e) {
            console.log('********** error on open inkscape: ', e)
        }

    }

    static async closeInkscape() {
        const closeWindowCommand = `${ConfigH.inkscapePath} -q --actions="window-close"`
        const closeInkscapeResult = await exec(closeWindowCommand)
        // console.log('Close inkscape result: ', closeInkscapeResult)
    }

    static async updateInkscape(svg: string) {
        try {
            await p.writeFile(ConfigH.projectPathSvg, svg, { encoding: 'utf-8' })

            // const updateInkscapeCommand = `${ConfigH.inkscapePath} -q --actions="selection-set-backup; file-rebase; selection-restore-backup; selection-empty-backup"`
            // const updateInkscapeResult = await exec(updateInkscapeCommand)
            this.inkscapeProcess.stdin.write(`selection-set-backup; file-rebase; selection-restore-backup; selection-empty-backup
            `)

            // console.log('update Inkscape Result: ', updateInkscapeResult)
        } catch (e) {
            console.log(e)
        }
    }




    private static async createSvg(filePath: string) {
        const createSvgCommand = `${ConfigH.inkscapePath} --actions="file-new; export-type:svg; export-filename:${filePath}; export-do"`
        const createSvgResult = await exec(createSvgCommand)
        // console.log('Create svg result: ', createSvgResult)
    }
}