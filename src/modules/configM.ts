import { InksnapConfig } from "app/src-electron/models/InksnapConfig"
import { LocalStorage } from "quasar"
import { ref } from "vue"
import { eapi } from "./eapi"

export abstract class ConfigM {

    private static _inkscapePath = ref(LocalStorage.getItem('inkscapePath') ?? '')
    static get inkscapePath() {
        return this._inkscapePath.value
    }
    static set inkscapePath(v) {
        LocalStorage.set('inkscapePath', v)
        this._inkscapePath.value = v
    }

    private static _projectsPath = ref(LocalStorage.getItem('projectsPath') ?? '')
    static get projectsPath() {
        return this._projectsPath.value
    }
    static set projectsPath(v) {
        LocalStorage.set('projectsPath', v)
        this._projectsPath.value = v
    }

    private static _projectPath = ref(LocalStorage.getItem('projectPath') ?? '')
    static get projectPath() {
        return this._projectPath.value
    }
    static set projectPath(v) {
        LocalStorage.set('projectPath', v)
        this._projectPath.value = v
    }

}