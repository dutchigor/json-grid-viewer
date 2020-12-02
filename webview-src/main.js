import { createApp } from 'vue'

import './css/app.css'

import App from './App.vue'
import ObjectCell from './components/ObjectCell'
import ArrayCell from  './components/ArrayCell'
import Cell from './components/Cell'

const app = createApp(App)
app.component( 'ObjectCell', ObjectCell )
app.component( 'ArrayCell', ArrayCell )
app.component( 'Cell', Cell )
app.mount('#app')
