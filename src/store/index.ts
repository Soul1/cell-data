import createStore from 'unistore'

export const actions = {
  setDataArr: async () => {
    return {dataArr: await fetch('/data.json').then(r => r.json())}
  }
}

const store = createStore({dataArr: null})

export default store

