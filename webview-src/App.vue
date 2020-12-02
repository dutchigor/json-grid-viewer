<template>
  <cell :element="jsonData" :expanded="true" />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      jsonData: {},
    }
  },
  created() {
    this.$options.vscode = window.acquireVsCodeApi();

    window.addEventListener('message', event => {
      console.log( event.data )
      switch (event.data.type) {
        case 'update':
          this.jsonData = event.data.doc
          console.log( this.jsonData )
          break;
      }
    })

    this.$options.vscode.postMessage({
      type: 'ready'
    })
  }
}
</script>
