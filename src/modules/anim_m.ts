import { AnimState } from "app/src-electron/models/AnimState"
import { computed, ref } from "vue"
import { eapiM } from "./eapi_m"


export abstract class AnimM {

    // static async init() {

    //     AnimM.savedState = await eapiM.getAnimState()
    //     AnimM.state = AnimM.savedState

    //     eapiM.onCurrentFrameUpdate((event: any, frame: any) => {

    //         if (!AnimM.state.svgFrames) AnimM.state.svgFrames = []
    //         if (!AnimM.state.currentFrameIndex) AnimM.state.currentFrameIndex = 0


    //         if (!AnimM.state?.svgFrames?.[AnimM.state?.currentFrameIndex ?? 0]) {

    //             AnimM.state.svgFrames.push(frame)

    //         } else {

    //             AnimM.state.svgFrames[AnimM.state.currentFrameIndex ?? 0] = frame

    //         }

    //     })

    // }

    // private static _state = ref<AnimState>({} as AnimState)
    // static get state() { return AnimM._state.value }
    // private static set state(value) { AnimM._state.value = value }

    // private static _savedState = ref<AnimState>({} as AnimState)
    // private static get savedState() { return AnimM._savedState.value }
    // private static set savedState(value) { AnimM._savedState.value = value }

    // static currentFrame = computed(() => this.state?.svgFrames?.[this.state?.currentFrameIndex ?? 0])

    // static addKeyframe() {
    //     AnimM.state.currentFrameIndex! += 1
    // }
}



