<template>
  <resizable-table :headers="headers" tblClass="object expanded" trClass="object-hdr">
    <template #body>
      <tr v-for="(val, key) in member" class="object member" :key="key">
        <th class="object key">{{ key }}</th>
        <td class="object element"><cell :element="val" /></td>
      </tr>
    </template>
  </resizable-table>
</template>

<script>
import ResizableTable from './ResizableTable.vue'
export default {
  components: { ResizableTable },
  // name: 'ObjectTable',
  props: [
    'member'
  ],
  data() {
    return {
      headers: [
        { header: 'key', thClass: 'object key' },
        { header: 'val', thClass: 'object value' }
      ]
    }
  }
}
</script>
