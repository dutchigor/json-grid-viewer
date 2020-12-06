
<template>
  <resizable-table
    :headers="[ { header: '', resize: false, thClass: 'index' }, ...headers ]"
    tblClass="array expanded"
    trClass = "array-hdr"
  >
    <template #header="{ hdr }">
      <span v-if="hdr !== 'index'">{{ hdr }}</span>
    </template>
    <template #body>
      <array-row v-for="(item, index) in array" :key="index" :element="item" :index="index" :columns="headers" />
    </template>
  </resizable-table>
</template>

<script>
export default {
  props: [
    'array'
  ],
  computed: {
    headers() {
      const hdrCells = this.array.reduce( ( hdrs, el ) => {
        if ( typeof el === 'object' ) {
          return [...new Set([...hdrs, ...Object.keys( el )])]
        }
        return hdrs
      }, [] )
        .map( header => {
          return { header, resize: true, thClass: "array member" }
        })
      return hdrCells
    }
  }
}
</script>
