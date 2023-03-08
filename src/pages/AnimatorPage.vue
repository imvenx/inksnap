<template>
    <div style="display:grid; grid-template-columns: 10em auto 10em; gap:1em; padding:0 1em; margin:1em">
        <KfsViewer />
        <AnimViewer />
    </div>
</template>

<script lang="ts" setup>
import { AnimM } from 'src/modules/anim_m';
import AnimViewer from 'src/components/AnimViewer.vue'
import KfsViewer from 'src/components/KfsViewer/KfsViewer.vue'

</script>

<style scoped></style>