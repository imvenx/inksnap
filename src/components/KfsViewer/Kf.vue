<template>
    {{ i }}
    <div ref="kfCont" style="border:1px solid grey; width:100px; height:100px; cursor: pointer;"
        :style="`${AnimM.currentFrameIndex == i ? 'border:1px solid yellow' : ''}`" @click="updateCurrentFrame(i)">
        <!-- {{ i
        }}
        <br>
        {{ kf }} -->

    </div>
</template>

<script lang="ts" setup>
import { AnimM } from 'src/modules/anim_m';
import { eapiM } from 'src/modules/eapi_m';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{ kf: string, i: number }>()

const kfCont = ref()

document.addEventListener(`kfUpdated`, (e: any) => onKfUpdate(e))

function onKfUpdate(e: any) {
    if (e.detail.i != props.i) return

    render(e.detail.kf)

}

onMounted(() => render())

function render(_kf: string = '') {
    kfCont.value.innerHTML = _kf || props.kf
    const svg = kfCont.value.children[0]

    if (!svg) return
    // svg.setAttribute('preserveAspectRatio', 'none')
    svg.style.width = '100px'
    svg.style.height = '100px'
}

async function updateCurrentFrame(i: number) {
    AnimM.currentFrameIndex = i
    await eapiM.updateInkscape(AnimM.currentSvg)
}
</script>

<style scoped></style>