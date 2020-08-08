import {h, render} from 'preact'
import App from './App'
import {Provider} from 'unistore/preact'
import './styles/index.scss'

import store from './store'

render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))