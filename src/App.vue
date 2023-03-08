<template>
  <div id="container">
    <div style="background-color:#111; display: grid; grid-template-columns: auto minmax(10%, 100%) auto;">
      <div style="display:flex">
        <q-btn style="margin-left: 1em;" size="sm" icon="home" to="/" title="home" />
        <q-btn style="margin-left: 1em" size="sm" icon="movie" flat to="/animator" title="animator" />
        <!-- <q-btn style="margin-left: 1em" size="sm" icon="animation" flat />
        <q-btn style="margin-left: 1em" size="sm" icon="article" flat /> -->
        <template v-if="$route.path === '/animator'">
          <div style="user-select: none; margin:0 1em">
            |
          </div>
          <q-btn size="sm" icon="animation" title="onion skin" disabled />
          <q-btn size="sm" icon="emergency_recording" title="record" disabled />
          <q-btn size="sm" @click="AnimM.addKeyframe()" icon="add_circle" title="add keyframe" />
          <q-btn size="sm" @click="AnimM.play()" icon="play_arrow" v-if="!AnimM.isPlaying" title="play" />
          <q-btn size="sm" @click="AnimM.pause()" icon="pause" v-if="AnimM.isPlaying" title="pause" />
          <q-btn size="sm" @click="eapiM.openInkscape()" icon="open_in_browser" title="open inkscape" />
          <q-btn size="sm" icon="undo" title="undo: [ctrl] + [z]" />
          <q-btn size="sm" icon="redo" title="redo: [ctrl] + [shift] + [z]" />
        </template>
      </div>

      <div style="-webkit-app-region:drag; text-align: center; user-select: none; font-weight: 600;">
        <span style="position: absolute; left:50%; transform: translate(-50%);">
          InkSnap - {{ ConfigM.config?.projectPath?.split('/').pop() }}
        </span>
      </div>

      <div style="margin-left:auto">
        <q-btn size="sm" flat icon="minimize" @click="eapiM.minimizeWindow" />
        <q-btn size="sm" flat icon="crop_square" @click="eapiM.maximizeWindow" />
        <q-btn size="sm" flat icon="close" @click="eapiM.closeWindow" />
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
  await AnimM.init()

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