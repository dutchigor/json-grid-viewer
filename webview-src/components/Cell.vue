<template>
  <template v-if="Array.isArray( element )">
    <span class="array collapsed">
      <span class="array badge">Array[{{ element.length }}]</span>
      <span class="expand" @click="toggleExpanded">{{ expanded ? '-' : '+' }}</span>
    </span>
    <array-table v-if="expanded" :array="element" />
  </template>
  <template v-else-if="typeof element === 'object' && element != null">
    <span class="object collapsed">
      <span class="object badge">Object[{{ Object.keys( element ).length}}]</span>
      <span class="expand" @click="toggleExpanded">{{ expanded ? '-' : '+' }}</span>
    </span>
    <object-table v-if="expanded" :member="element" />
  </template>
  <span v-else :class="['value', (element === null ? 'null' : typeof element)]">{{ element }}</span>
</template>

<script>
export default {
  props: [
    'element',
  ],
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded
    }
  },
  created() {
    if ( this.$parent === this.$root ) this.expanded = true
  }
}
</script>
