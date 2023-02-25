<template>
    <div style="display:grid; gap: 2%; grid-template-columns: 50% auto;">

        <div style="padding:1em; display: flex; flex-direction: column; gap:3%;">

            <div style="display: flex; gap:1%">
                <q-btn outline @click="eapi.createNewProject">New</q-btn>
                <q-btn outline>Open</q-btn>
            </div>

            <div title="/usr/bla/blablabla" style="overflow: hidden;white-space: break-spaces;">
                <u>Inkscape Path:</u>

                <q-btn icon="edit" size="xs" flat @click="setInkscapePath"></q-btn>

                <span style="text-overflow: clip; word-wrap: break-word;">
                    {{ inkscapePath }}
                </span>

            </div>

            <div title="/usr/bla/blablabla" style="overflow: hidden;white-space: break-spaces;">
                <u>Projects Path:</u>

                <q-btn icon="edit" size="xs" flat @click="setProjectsPath"></q-btn>

                <span style="text-overflow: clip; word-wrap: break-word;">
                    {{ projectsPath }}
                </span>

            </div>

        </div>

        <div style="padding:1% 2%;  display:flex; flex-direction:column; height: 100vh;">

            <span class="text-center">Open Recent </span>

            <div style="overflow: auto; display:flex; flex-direction:column; gap:5px; padding:1% 2%; border-radius: 8px;">
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
import { LocalStorage } from 'quasar';
import { eapi } from 'src/modules/eapi';
import { ref } from 'vue';

const inkscapePath = ref(LocalStorage.getItem('inkscapePath') ?? '')
const projectsPath = ref(LocalStorage.getItem('projectsPath') ?? '')

async function setInkscapePath() {
    const path = await eapi.setInkscapePath()
    if (path) {
        LocalStorage.set('inkscapePath', path)
        inkscapePath.value = path
    }
}

async function setProjectsPath() {
    const path = await eapi.setProjectsPath()
    console.log(path)
    if (path) {
        LocalStorage.set('projectsPath', path)
        projectsPath.value = path
    }
}

</script>

<style scoped></style>