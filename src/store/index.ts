import createStore from 'unistore'

export type TData = {
  svcId: number,
  ctime: string,
  svcType: string,
  userName: string,
  feedback: number,
  comment: string
}

export type TDataArr = TData[]

export const actions = {
  setDataArr: async () => {
    return {dataArr: await fetch('/data.json').then(r => r.json())}
  },
  setCell: (cell: []) => {
    return {dataArr: cell}
  }
}

const store = createStore({dataArr: null, cell: []})

export default store

