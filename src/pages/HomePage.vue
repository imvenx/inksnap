<template>
    <div style="display:grid; gap: 2%; grid-template-columns: 50% auto; height: 100%;">

        <div style="padding:1em; display: flex; flex-direction: column; gap:3%; overflow: auto;">

            <div style="display: flex; gap:1%">
                <q-btn outline @click="createNewProject">
                    <span v-if="!isCreatingProject">New</span>
                    <q-spinner v-else />
                </q-btn>
                <q-btn outline>Open</q-btn>
            </div>

            <div style="display: grid; grid-template-columns: 100px 40px auto;">
                <u>Inkscape Path:</u>

                <q-btn icon="edit" size="xs" flat @click="setInkscapePath"></q-btn>

                <div :title="ConfigM.config?.inkscapePath" class="configListItem">
                    {{ ConfigM.config?.inkscapePath }}
                </div>

            </div>

            <div style="display: grid; grid-template-columns: 100px 40px auto;">
                <u>Projects Path:</u>

                <q-btn icon="edit" size="xs" flat @click="setProjectsPath"></q-btn>

                <div :title="ConfigM.config?.projectsPath" class="configListItem">
                    {{ ConfigM.config?.projectsPath }}
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
import { ConfigM } from 'src/modules/config_m';
import { eapiM } from 'src/modules/eapi_m';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const isCreatingProject = ref(false)

async function setInkscapePath() {
    const path = await eapiM.setInkscapePath()
}

async function setProjectsPath() {
    const path = await eapiM.setProjectsPath()
}

async function createNewProject() {
    isCreatingProject.value = true
    const success = await eapiM.createNewProject()
    isCreatingProject.value = false

    if (success) router.push('/animator')
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