import createStore from 'unistore'
import Row from 'gridjs/dist/src/row'

export type TRow = Row | null

export type TData = {
  svcId: number,
  ctime: string,
  svcType: string,
  userName: string,
  feedback: number,
  comment: string
}

export type TDataArr = TData[] | null

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

