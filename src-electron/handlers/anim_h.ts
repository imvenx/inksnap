import electron, { dialog } from "electron";
import path from "path"
import { promises as fsPromises, readFileSync } from "fs"
import { InksnapConfig } from "../models/InksnapConfig";
import { mainWindow } from "../electron-main";
import { ConfigH } from "./config_h";
import { AnimState } from "../models/AnimState";


export abstract class AnimH {

    static updateCurrentFrame(file: string) {
        mainWindow?.webContents.send('onSvgUpdate', file)
    }
}