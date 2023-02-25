import { exec as _exec } from "child_process";
import { promisify } from "util";
const exec = promisify(_exec);
import { promises as fsPromises } from "fs"
import { dialog } from "electron";
import { ConfigH } from "./config_h";

export abstract class InkscapeH {

    static async createNewProject() {
        try {

            const saveDialogResponse = await dialog.showSaveDialog({
                defaultPath: ConfigH.projectsPath(),
                title: "Select new project path",
                properties: ['showOverwriteConfirmation'],
            })

            const directoryPath = saveDialogResponse.filePath
            if (!directoryPath) return

            try { await fsPromises.mkdir(directoryPath) }
            catch { dialog.showErrorBox('Error', "Project name repeated") }

            const filePath = `${directoryPath}/${directoryPath.split('/').pop()}.svg`

            this.closeInkscape()

            await this.createSvg(filePath)

            await this.openSvg(filePath)

            return directoryPath

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
        return path
    }






    private static async closeInkscape() {
        const closeWindowCommand = `${ConfigH.inkscapePath()} -q --actions="window-close"`
        await exec(closeWindowCommand)
    }

    private static async createSvg(filePath: string) {
        const createSvgCommand = `${ConfigH.inkscapePath()} --actions="file-new; export-type:svg; export-filename:${filePath}; export-do"`
        const resCreateSvg = await exec(createSvgCommand)
    }

    private static async openSvg(filePath: string) {
        const openSvgCommand = `${ConfigH.inkscapePath()} "${filePath}"`
        const resOpenSvg = await exec(openSvgCommand)
    }

}