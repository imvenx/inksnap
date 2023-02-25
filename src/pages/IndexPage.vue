<template>
    <div style="display:grid; gap: 2%; grid-template-columns: 50% auto; height: 100%;">

        <div style="padding:1em; display: flex; flex-direction: column; gap:3%; overflow: auto;">

            <div style="display: flex; gap:1%">
                <q-btn outline @click="createNewProject" :loading="creatingProject">New</q-btn>
                <q-btn outline>Open</q-btn>
            </div>

            <div style="display: grid; grid-template-columns: auto auto auto;">
                <u>Inkscape Path:</u>

                <q-btn icon="edit" size="xs" flat @click="setInkscapePath"></q-btn>

                <div :title="ConfigM.inkscapePath.toString()" class="configListItem">
                    {{ ConfigM.inkscapePath }}
                </div>

            </div>

            <div style="display: grid; grid-template-columns: auto auto auto;">
                <u>Projects Path:</u>

                <q-btn icon="edit" size="xs" flat @click="setProjectsPath"></q-btn>

                <div :title="ConfigM.projectsPath.toString()" class="configListItem">
                    {{ ConfigM.projectsPath }}
                </div>

            </div>
        </div>

        <div style="padding:4px 6px 0;  display:flex; flex-direction:column; overflow: hidden;">

            <span class="text-center">Open Recent </span>

            <div style="overflow: auto; display:flex; flex-direction:column; gap:5px; padding:1% 2%;  ">
                <div style="border:1px solid #777;background-color: #111; border-radius: 5px; padding:.5% 3%">My project
                </div>
                <div style="border:1px solid #777;background-color: #111; border-radius: 5px; padding:.5% 3%">My project
                </div>
                <div style="border:1px solid #777;background-color: #111; border-radius: 5px; padding:.5% 3%">My project
                </div>
                <div style="border:1px solid #777;background-color: #111; border-radius: 5px; padding:.5% 3%">My project
                </div>
                <div style="border:1px solid #777;background-color: #111; border-radius: 5px; padding:.5% 3%">My project
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ConfigM } from 'src/modules/configM';
import { eapi } from 'src/modules/eapi';
import { ref } from 'vue';

const creatingProject = ref(false)

async function setInkscapePath() {
    const path = await eapi.setInkscapePath()
    if (path) ConfigM.inkscapePath = path
}

async function setProjectsPath() {
    const path = await eapi.setProjectsPath()
    if (path) ConfigM.projectsPath = path
}

async function createNewProject() {
    // creatingProject.value = true
    const path = await eapi.createNewProject()
    creatingProject.value = false
    if (path) ConfigM.projectPath = path
}

</script>

<style scoped>
.configListItem {
    text-overflow: ellipsis;
    word-wrap: normal;
    white-space: nowrap;
    overflow: hidden;
    display: inline;
}
</style>