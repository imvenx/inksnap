<template>
  <div id="container">
    <div style="background-color:#111; display: grid; grid-template-columns: auto minmax(10%, 100%) auto;">
      <div>
        <q-btn style="margin-left: 1em" size="xs" icon="home" flat to="/" title="home" />
        <q-btn style="margin-left: 1em" size="xs" icon="movie" flat to="/animator" title="animator" />
        <!-- <q-btn style="margin-left: 1em" size="xs" icon="animation" flat />
        <q-btn style="margin-left: 1em" size="xs" icon="article" flat /> -->
      </div>

      <div style="-webkit-app-region:drag; text-align: center; user-select: none; font-weight: 600;">
        <span style="position: absolute; left:50%; transform: translate(-50%);">
          InkSnap - {{ ConfigM.config?.projectPath?.split('/').pop() }}
        </span>
      </div>

      <div style="margin-left:auto">
        <q-btn size="xs" flat icon="minimize" @click="eapiM.minimizeWindow" />
        <q-btn size="xs" flat icon="crop_square" @click="eapiM.maximizeWindow" />
        <q-btn size="xs" flat icon="close" @click="eapiM.closeWindow" />
      </div>
    </div>

    <div style="overflow: hidden;">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { AnimM } from './modules/anim_m';
import { ConfigM } from './modules/config_m';
import { eapiM } from './modules/eapi_m';

const router = useRouter()

onMounted(async () => await initInksnap())

async function initInksnap() {

  await ConfigM.init()
  // await AnimM.init()

  if (ConfigM.config.projectPath) router.push('/animator')

}

</script>

<style>
#container {
  overflow: hidden;
  border-radius: 10px !important;
  height: 100vh;
  background-color: #222 !important;
  border: 1px solid #666;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

html,
body {
  background-color: transparent !important;
}

* {
  color: #ccc;
}
</style>