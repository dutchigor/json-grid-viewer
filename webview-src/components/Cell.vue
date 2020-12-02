<template>
  <template v-if="Array.isArray( element )">
    <span class="array collapsed">
      <span class="array badge">Array[{{ element.length }}]</span>
      <span class="expand" @click="expanded = !expanded">{{ expanded ? '-' : '+' }}</span>
    </span>
    <array-cell v-if="expanded" :element="element" />
  </template>
  <template v-else-if="typeof element === 'object' && element != null">
    <span class="object collapsed">
      <span class="object badge">Object[{{ Object.keys( element ).length}}]</span>
      <span class="expand" @click="expanded = !expanded">{{ expanded ? '-' : '+' }}</span>
    </span>
    <object-cell v-if="expanded" :element="element" />
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
  created() {
    if ( this.$parent === this.$root ) this.expanded = true
  }
}
</script>
