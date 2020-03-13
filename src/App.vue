import('@/components/Settings.vue');

<template>
  <div id="app">
    <my-settings v-model="settings"/>
    <my-exec v-model="settings"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import SettingsComponent from '@/components/Settings.vue';
import ExecComponent from '@/components/Exec.vue';

import Settings from '@/models/settings';

@Component({
  components: {
    'my-settings': SettingsComponent,
    'my-exec': ExecComponent,
  },
})
export default class App extends Vue {
  settings = new Settings();
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  background-color: lightgray;
  padding: 15px;
  margin-bottom: 8px;
}

input[type="button"],
button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 5px;
}

select {
  width: 50%;
  background-color: #3065ac;
  border: none;
  color: white;
  padding: 15px 20px;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 5px;
}
</style>
