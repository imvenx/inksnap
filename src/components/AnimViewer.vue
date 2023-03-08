<template>
    <div style="border:1px solid #aaa; height:150px; width:150px" ref="svgCont">
    </div>
</template>

<script lang="ts" setup>
import { AnimM } from 'src/modules/anim_m';
import { onMounted, ref, watch } from 'vue';

const svgCont = ref<HTMLDivElement>()
const svgEl = ref<HTMLDivElement>({} as HTMLDivElement)

onMounted(() => {
    if (!svgCont.value) return
    svgCont.value.innerHTML = AnimM.currentSvg
    svgEl.value = svgCont.value.children[0] as HTMLDivElement
    if (!svgEl.value) return
    svgEl.value.style.width = '5em'
    svgEl.value.style.height = '5em'
})

watch(() => AnimM.currentSvg, () => {
    if (!svgCont.value) return
    svgCont.value.innerHTML = AnimM.currentSvg
    svgEl.value = svgCont.value.children[0] as HTMLDivElement
    if (!svgEl.value) return
    svgEl.value.style.width = '100%'
    svgEl.value.style.height = '100%'
})

</script> 