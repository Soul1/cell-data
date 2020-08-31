import createStore from 'unistore'
import {TRow} from '../types'

export const actions = {
  setDataArr: async () => {
    return {dataArr: await fetch('/data.json').then(r => r.json())}
  },
  setRow: (state: any, row: TRow) => {
    return {row}
  }
}

const store = createStore({dataArr: null, row: null})

export default store

