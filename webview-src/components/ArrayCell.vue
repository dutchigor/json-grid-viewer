
<template>
  <table class="array expanded" ref="arrayTable">
    <thead v-if="headers.length > 0" >
      <tr class="array-hdr">
        <th class="index"></th>
        <th v-for="hdr in headers" :key="hdr" class="member">
          {{ hdr }}
          <div
            class="resizer"
            :style="{ height: tableHeight }"
            @dblclick="resetColSize"
            @mousedown="resizeCol"
            ></div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in element" :key="index" :class="['array-el', typeOfEl( item )]">
        <td :class="[ 'index', typeOfEl( item ) ]">{{ index }}</td>
        <template v-if="typeOfEl( item ) === 'object'">
          <td v-for="hdr in headers" :key="hdr" class="member">
            <cell :element="item[hdr]" />
          </td>
        </template>
        <td v-else class="value" :colspan="headers.length">
          <cell :element="item" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: [
    'element'
  ],
  data() {
    return {
      tableHeight: 0
    }
  },
  computed: {
    headers() {
      return this.element.reduce( ( hdr, el ) => {
        if ( typeof el === 'object' ) {
          return [...new Set([...hdr, ...Object.keys( el )])]
        }
        return hdr
      }, [] )
    }
  },
  methods: {
    typeOfEl( el ) {
      return Array.isArray( el ) ? 'array' :
        el === null ? 'null' :
        typeof el 
    },
    resizeCol( e ) {
      const leftCol = e.target.closest( 'th' )
      const leftColWidth = leftCol.offsetWidth
      const rightCol = leftCol.nextElementSibling
      const rightColWidth = rightCol ? rightCol.offsetWidth : null
      const table = leftCol.closest( 'table' )
      const tableWidth = table.offsetWidth
      const startX = e.pageX

      function setSize( e ) {
        const movedX = e.pageX - startX
        leftCol.style.width = ( leftColWidth + movedX ) + 'px'
        table.style.width = ( tableWidth + movedX ) + 'px'
        if ( rightCol ) rightCol.style.width = ( rightColWidth - movedX ) + 'px'
      }

      document.addEventListener( 'mousemove', setSize )

      function cleanup() {
        document.removeEventListener( 'mousemove', setSize )
        document.removeEventListener( 'mouseup', cleanup )
      }

      document.addEventListener( 'mouseup', cleanup )
    },
    resetColSize( e ) {
      e.target.parentElement.style.width = null
    }
  },
  mounted() {
    this.$options.tableHeightObserver = new ResizeObserver(
      entries => this.tableHeight = entries[0].contentRect.height + 'px'
    )

    this.$options.tableHeightObserver.observe( this.$refs.arrayTable )
  }
}
</script>
