import { createApp } from 'vue'

import './css/app.css'

import App from './App.vue'
import ObjectTable from './components/ObjectTable'
import ArrayTable from  './components/ArrayTable'
import Cell from './components/Cell'
import ResizableTable from './components/ResizableTable'
import ArrayRow from './components/ArrayRow'

const app = createApp(App)
app.component( 'ObjectTable', ObjectTable )
app.component( 'ArrayTable', ArrayTable )
app.component( 'Cell', Cell )
app.component( 'ResizableTable', ResizableTable )
app.component( 'ArrayRow', ArrayRow )
app.mount('#app')
