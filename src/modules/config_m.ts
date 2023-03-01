import { InksnapConfig } from "app/src-electron/models/InksnapConfig"
import { ref } from "vue"
import { eapiM } from "./eapi_m"


export abstract class ConfigM {

    // private static init = (async () => {

    //     ConfigM.config = await eapiM.getConfig()

    //     eapiM.onConfigUpdate((event: any, config: any) => { ConfigM.config = config })

    // })()

    static async init() {

        ConfigM.config = await eapiM.getConfig()

        eapiM.onConfigUpdate((event: any, config: any) => { ConfigM.config = config })

    }

    private static _config = ref<InksnapConfig>({} as InksnapConfig)
    public static get config() { return ConfigM._config.value }
    private static set config(v) { ConfigM._config.value = v }


    // static readonly inkscapePath = (() => this.config.value?.inkscapePath)()
    // static readonly projectPath = (() => this.config.value?.projectPath)()
    // static readonly projectsPath = (() => this.config.value?.projectsPath)()

    // private static _inkscapePath = ref(LocalStorage.getItem('inkscapePath') ?? '')
    // static get inkscapePath() {
    //     return this._inkscapePath.value
    // }
    // static set inkscapePath(v) {
    //     LocalStorage.set('inkscapePath', v)
    //     this._inkscapePath.value = v
    // }

    // private static _projectsPath = ref(LocalStorage.getItem('projectsPath') ?? '')
    // static get projectsPath() {
    //     return this._projectsPath.value
    // }
    // static set projectsPath(v) {
    //     LocalStorage.set('projectsPath', v)
    //     this._projectsPath.value = v
    // }

    // private static _projectPath = ref(LocalStorage.getItem('projectPath') ?? '')
    // static get projectPath() {
    //     return this._projectPath.value
    // }
    // static set projectPath(v) {
    //     LocalStorage.set('projectPath', v)
    //     this._projectPath.value = v
    // }

}