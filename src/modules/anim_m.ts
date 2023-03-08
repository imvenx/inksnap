import { LocalStorage } from "quasar"
import { ref } from "vue"
import { eapiM } from "./eapi_m"


export abstract class AnimM {

    static async init() {
        eapiM.onSvgUpdate((event: any, svg: any) => this.updateSvg(svg))
    }

    private static _frames = ref<string[]>(LocalStorage.getItem('frames') ?? new Array(10))
    public static get frames() { return AnimM._frames.value }
    // public static set frames(v) {
    //     AnimM._frames.value = v
    //     LocalStorage.set('frames', v)
    // }

    private static _currentFrameIndex = ref<number>(LocalStorage.getItem('currentFrame') ?? 0)
    public static get currentFrameIndex() { return AnimM._currentFrameIndex.value }
    public static set currentFrameIndex(v) {
        AnimM._currentFrameIndex.value = v
        LocalStorage.set('currentFrame', v)
        if (this.frames[v]) this.currentSvg = this.frames[v]
    }

    private static _currentSvg = ref<string>(LocalStorage.getItem('currentSvg') ?? '')
    public static get currentSvg() { return AnimM._currentSvg.value }
    public static set currentSvg(v) {
        AnimM._currentSvg.value = v
        LocalStorage.set('currentSvg', v)
    }

    private static _isPlaying = ref(false)
    public static get isPlaying() { return AnimM._isPlaying.value }
    public static set isPlaying(v) { AnimM._isPlaying.value = v }

    private static animInterval: any

    static addKeyframe() {
        this.frames[this.currentFrameIndex] = this.currentSvg
        LocalStorage.set('frames', this.frames)

        const kfUpdatedEvent = new CustomEvent<any>(`kfUpdated`, { detail: { kf: this.currentSvg, i: this.currentFrameIndex } })
        document.dispatchEvent(kfUpdatedEvent)
    }

    static play() {
        this.animInterval = setInterval(() => {
            if (this.currentFrameIndex + 1 >= this.frames.length) {
                this.currentFrameIndex = 0
            }
            else {
                this.currentFrameIndex++
            }
            const next = this.frames[this.currentFrameIndex]
            if (!next) return
            this.currentSvg = next
        }, 100)
        this.isPlaying = true
    }

    static async pause() {
        clearInterval(this.animInterval);
        this.isPlaying = false
        await eapiM.updateInkscape(AnimM.currentSvg)
    }

    private static updateSvg(svg: string) {
        this.currentSvg = svg
    }

}



