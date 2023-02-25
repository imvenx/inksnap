<template>
  <div id="container">
    <div style="background-color:#111; display: grid; grid-template-columns: auto minmax(10%, 100%) auto;">
      <div>
        <q-btn style="margin-left: 1em" size="xs" icon="article" flat />
        <q-btn style="margin-left: 1em" size="xs" icon="save" flat />
      </div>

      <div style="-webkit-app-region:drag; text-align: center; user-select: none; font-weight: 800;">
        inksnap
      </div>

      <div style="margin-left:auto">
        <q-btn size="xs" icon="minimize" flat @click="eapi.minimizeWindow" />
        <q-btn size="xs" icon="crop_square" flat @click="eapi.maximizeWindow" />
        <q-btn size="xs" icon="close" flat @click="eapi.closeWindow" />
      </div>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { eapi } from './modules/eapi';

</script>

<style>
#container {
  overflow: hidden;
  border-radius: 10px !important;
  height: 100vh;
  background-color: #222 !important;
  border: 1px solid #666;
}

html,
body {
  background-color: transparent !important;
}
</style>