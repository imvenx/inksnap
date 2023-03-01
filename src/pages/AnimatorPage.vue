<template>
    <div>
        <!-- <q-btn size="sm" @click="AnimM.addKeyframe()">Keyframe</q-btn> -->
    </div>
    <div style="display:grid; grid-template-columns: 10em auto 10em; gap:1em; padding:0 1em">
        <div>
            Main layer
        </div>
        <div>
            <!-- <div v-for="kf in AnimM.state.svgFrames">kf</div> -->
        </div>
        <!-- <div style="border:1px solid #aaa; height:7em" v-html="AnimM.state?.svgFrames?.[0]" ref="svgCont">
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import { AnimM } from 'src/modules/anim_m';
import { onUpdated, ref } from 'vue';

const svgCont = ref<HTMLDivElement>()

onUpdated(() => {
    const svgEl = svgCont.value?.children[0] as HTMLElement
    if (!svgEl) return
    svgEl.style.width = '5em'
    svgEl.style.height = '5em'


})

</script>

<style scoped></style>