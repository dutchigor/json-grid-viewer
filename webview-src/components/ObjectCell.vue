AStarting <template>
  <table class="object expanded">
    <tr v-for="(val, key) in element" class="member" :key="key">
      <th class="key">{{ key }}</th>
      <td class="element"><cell :element="val" /></td>
    </tr>
  </table>
</template>

<script>
export default {
  props: [
    'element'
  ]
}
</script>
