import electron, { dialog } from "electron";
import path from "path"
import { promises as p, readFileSync } from "fs"
import { InksnapConfig } from "../models/InksnapConfig";
import { mainWindow } from "../electron-main";


export abstract class ConfigH {

    static configRootPath = path.join(electron.app.getPath('userData'), 'inksnapConfig.json')
    private static config: InksnapConfig = this.get()

    static readonly inkscapePath = (() => this.config.inkscapePath)()
    static readonly projectsPath = (() => this.config.projectsPath)()
    static readonly projectPath = (() => this.config.projectPath)()
    static readonly projectPathSvg = (() => this.config.projectPath + '/' + this.config.projectPath.split('/').pop() + '.svg')()
    static readonly projectPathJson = (() => this.config.projectPath + '/' + this.config.projectPath.split('/').pop() + '.json')()

    static get(): InksnapConfig {
        try {
            const configFileString = readFileSync(ConfigH.configRootPath, 'utf-8')
            return JSON.parse(configFileString)
        } catch (e) {
            console.log(e, 'Error on try get config')
            this.save()
            return {} as InksnapConfig
        }
    }

    private static async save(): Promise<void> {
        try {
            if (!this.config) this.config = {} as InksnapConfig
            await p.writeFile(ConfigH.configRootPath, JSON.stringify(this.config), { encoding: 'utf-8' })
            mainWindow?.webContents.send('onConfigUpdate', this.config)
        }
        catch (e) {
            console.log(e, 'Error on try set config')
        }
    }

    static async saveInkscapePath(path: string) {
        this.config.inkscapePath = path
        await this.save()
    }

    static async setProjectsPath() {

        const path = (
            await dialog.showOpenDialog({
                properties: ['openDirectory'],
                title: "Select projects path",
            })).filePaths[0]

        if (path) {
            this.config.projectsPath = path
            await this.save()
        }

    }

    static async setProjectPath(path: string) {

        if (!path) console.log('Error: Trying to set path to undefined')

        this.config.projectPath = path
        await this.save()

    }

}