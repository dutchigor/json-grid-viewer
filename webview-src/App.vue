<template>
  <cell :element="jsonData" :expanded="true" />
</template>

<script>
export default {
  // name: 'App',
  data() {
    return {
      jsonData: {},
    }
  },
  created() {
    this.$options.vscode = window.acquireVsCodeApi();

    window.addEventListener('message', event => {
      switch (event.data.type) {
        case 'update':
          this.jsonData = event.data.doc
          break;
      }
    })

    this.$options.vscode.postMessage({
      type: 'ready'
    })
  }
}
</script>
