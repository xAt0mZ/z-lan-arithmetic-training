<template>
  <div class="container">
    <h1>Settings</h1>
    <div>
      <span>Allowed operations</span>
      <div v-for="op in settings.ops" v-bind:key="op.label">
        <input type="checkbox" v-model="op.activated" />
        {{ op.label }}
      </div>
    </div>
    <div>
      <label for="opsCount">Number of operations:</label>
      <input id="opsCount" min="1" type="number" v-model.number="settings.opsCount" />
    </div>
    <div>
      <span>Numbers range</span>
      <div>
        <label for="min">Min:</label>
        <input id="min" type="number" v-model.number="settings.range.min" />
        <label for="max">Max:</label>
        <input id="max" type="number" v-model.number="settings.range.max" />
      </div>
      <label for="float">Allow floating values:</label>
      <input id="float" type="checkbox" v-model="settings.allowFloat" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';
import Settings from '@/models/settings';

@Component
export default class SettingsComponent extends Vue {
  @Model() settings!: Settings;
}
</script>
