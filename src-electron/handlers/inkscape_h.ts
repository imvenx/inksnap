import { exec as _exec } from "child_process";
import { promisify } from "util";
const exec = promisify(_exec);
import { promises as fsp, unwatchFile, watchFile, } from "fs"
import { dialog } from "electron";
import { ConfigH } from "./config_h";

export abstract class InkscapeH {

    static async createNewProject() {
        try {

            const path = (
                await dialog.showOpenDialog({
                    defaultPath: ConfigH.projectsPath(),
                    properties: ['openDirectory'],
                    title: "Select project path",
                })).filePaths[0]

            if (!path) return

            fsp.writeFile(`${path}/test.svg`, '<svg> </svg>', { encoding: 'utf-8' })
            // const resCreateSvg = await exec(`${ConfigH.inkscapePath()} --actions="file-new:${path}/test.svg"`)
            // console.log(resCreateSvg)

            const res = await exec(`${ConfigH.inkscapePath()} ${path}/test.svg`)
            console.log(res)

        } catch (e) {
            console.log(e)
        }
    }

    static async setInkscapePath() {

        const path = (
            await dialog.showOpenDialog({
                properties: ['openFile'],
                title: "Select inkscape's path",
            })).filePaths[0]

        if (path) {
            ConfigH.saveInkscapePath(path)
            return path
        }
    }

}