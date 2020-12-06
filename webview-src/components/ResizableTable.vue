<template>
  <table :class="tblClass" ref="arrayTable">
    <thead v-if="headers.length > 0" :class="theadClass" >
      <tr :class="trClass">
        <th
          v-for="{ header, resize, thClass } in headers"
          :key="header"
          :class="thClass"
          :style="{ minWidth: colWidth[header], width: colWidth[header] }"
          :ref="header"
        >
          <slot name="header" :hdr="header" />
          <div
            v-if="!(resize === false)"
            class="resizer"
            :style="{ height: tableHeight }"
            @mousedown="resizeCol( header, $event )"
            @dblclick="resetColSize( header )"
            ></div>
        </th>
      </tr>
    </thead>
    <tbody>
      <slot name="body" />
    </tbody>
  </table>
</template>

<script>
export default {
  props: [
    'headers',
    'tblClass',
    'theadClass',
    'trClass'
  ],
  data() {
    return {
      tableHeight: 0,
      colWidth: {}
    }
  },
  methods: {
    resizeCol( hdr, e ) {
      const startX = e.pageX
      const colStartWidth = parseInt( window.getComputedStyle( this.$refs[hdr] ).width, 10 )

      const setSize = e => {
        const movedX = e.pageX - startX
        this.colWidth[hdr] = colStartWidth + movedX + 'px'
      }

      document.addEventListener( 'mousemove', setSize )

      function cleanup() {
        document.removeEventListener( 'mousemove', setSize )
        document.removeEventListener( 'mouseup', cleanup )
      }

      document.addEventListener( 'mouseup', cleanup )
    },
    resetColSize( hdr ) {
      this.colWidth[hdr] = null
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

<style scoped>
.resizer {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: -3px;
  width: 6px;
  cursor: col-resize;
  user-select: none;
  z-index: 999;
}

th {
  position: relative;
}
</style>