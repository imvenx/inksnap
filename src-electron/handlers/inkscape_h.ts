import { exec as _exec } from "child_process";
import { promisify } from "util";
const exec = promisify(_exec);
import { promises as fsPromises, watchFile } from "fs"
import { dialog } from "electron";
import { ConfigH } from "./config_h";
import { AnimH } from "./anim_h";

export abstract class InkscapeH {

    static async createNewProject() {
        try {

            const saveDialogResponse = await dialog.showSaveDialog({
                defaultPath: ConfigH.projectsPath,
                title: "Select new project path",
                properties: ['showOverwriteConfirmation'],
            })

            const directoryPath = saveDialogResponse.filePath
            if (!directoryPath) return

            try { await fsPromises.mkdir(directoryPath) }
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



    static openInkscape(filePath: string) {
        // const openSvgCommand = `${ConfigH.inkscapePath} "${filePath}"`
        // const openSvgResult = exec(openSvgCommand)
        // console.log('Open svg result: ', openSvgResult)

        watchFile(filePath, { interval: 200 }, async (curr, prev) => {
            const fileContent = await fsPromises.readFile(filePath, { encoding: 'utf-8' })
            AnimH.updateCurrentFrame(fileContent)
        })

    }

    static async closeInkscape() {
        // const closeWindowCommand = `${ConfigH.inkscapePath} -q --actions="window-close"`
        // const closeInkscapeResult = await exec(closeWindowCommand)
        // console.log('Close inkscape result: ', closeInkscapeResult)
    }




    private static async createSvg(filePath: string) {
        const createSvgCommand = `${ConfigH.inkscapePath} --actions="file-new; export-type:svg; export-filename:${filePath}; export-do"`
        const createSvgResult = await exec(createSvgCommand)
        // console.log('Create svg result: ', createSvgResult)
    }



}