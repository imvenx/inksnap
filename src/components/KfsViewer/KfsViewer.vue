<template>
    <div>
        Main layer
    </div>
    <div style="display:flex; gap:5px; overflow-x: auto; overflow-y: hidden; padding:.5em; border:1px solid #666; box-shadow: inset 0 0 5px black; 
                    border-radius: 10px; background-color: #333;">
        <template v-for="kf, i in AnimM.frames">
            <Kf :i="i" :kf="kf" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import { AnimM } from 'src/modules/anim_m';
import Kf from './Kf.vue';

</script>

<style scoped></style>