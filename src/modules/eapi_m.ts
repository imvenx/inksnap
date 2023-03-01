const _eapi = (window as any).electronAPI

// export const eeval = _eapi.eeval as Function

export abstract class eapiM {

    static setInkscapePath = () => _eapi.setInkscapePath()
    static setProjectsPath = () => _eapi.setProjectsPath()

    static minimizeWindow = () => _eapi.minimizeWindow()
    static maximizeWindow = () => _eapi.maximizeWindow()
    static closeWindow = () => _eapi.closeWindow()

    static createNewProject = () => _eapi.createNewProject()

    static getConfig = () => _eapi.getConfig()
    static getAnimState = () => _eapi.getAnimState()




    // Main to renderer

    static onConfigUpdate = (cb: any) => _eapi.onConfigUpdate(cb)
    static onCurrentFrameUpdate = (cb: any) => _eapi.onCurrentFrameUpdate(cb)
}