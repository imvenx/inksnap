import electron, { dialog } from "electron";
import path from "path"
import { promises as fsPromises, readFileSync } from "fs"
import { InksnapConfig } from "../models/InksnapConfig";
import { mainWindow } from "../electron-main";
import { ConfigH } from "./config_h";
import { AnimState } from "../models/AnimState";


export abstract class AnimH {

    static updateCurrentFrame(file: string) {
        mainWindow?.webContents.send('onCurrentFrameUpdate', file)
    }

    // // static configRootPath = path.join(electron.app.getPath('userData'), 'inksnapConfig.json')
    // private static state: AnimState = this.get()

    // // static readonly inkscapePath = (() => this.config.inkscapePath)()
    // // static readonly projectsPath = (() => this.config.projectsPath)()
    // // static readonly projectPath = (() => this.config.projectPath)()

    // static get(): AnimState {
    //     try {
    //         const animState = readFileSync(ConfigH.projectPathJson, 'utf-8')
    //         return JSON.parse(animState)
    //     } catch (e: any) {
    //         // if (!e.toString().includes('ENOENT: no such file or directory')) {
    //         //     console.log(e, 'Error on try get config')
    //         //     // this.save()
    //         //     return {} as AnimState
    //         // }
    //         try {
    //             fsPromises.writeFile(ConfigH.projectPathJson, '{}', { encoding: 'utf-8' })
    //         } catch (e) {
    //             console.log(e)
    //         }
    //         return { currentFrameIndex: 0, svgFrames: [] } as AnimState
    //     }
    // }

    // private static async save(): Promise<void> {
    //     try {
    //         if (!this.config) this.config = {} as InksnapConfig
    //         await p.writeFile(ConfigH.configRootPath, JSON.stringify(this.config), { encoding: 'utf-8' })
    //         mainWindow?.webContents.send('onConfigUpdate', this.config)
    //     }
    //     catch (e) {
    //         console.log(e, 'Error on try set config')
    //     }
    // }

    // static async saveInkscapePath(path: string) {
    //     this.config.inkscapePath = path
    //     await this.save()
    // }

    // static async setProjectsPath() {

    //     const path = (
    //         await dialog.showOpenDialog({
    //             properties: ['openDirectory'],
    //             title: "Select projects path",
    //         })).filePaths[0]

    //     if (path) {
    //         this.config.projectsPath = path
    //         await this.save()
    //     }

    // }

    // static async setProjectPath(path: string) {

    //     if (!path) console.log('Error: Trying to set path to undefined')

    //     this.config.projectPath = path
    //     await this.save()

    // }

}