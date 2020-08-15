import createStore from 'unistore'

export type TRows = [
  {isTrusted: boolean},
  {
    _cells: [{_id: string, data: string | number | boolean}],
    _id: string
  }
] | null

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
  setRows: (state: any, rows: TRows) => {
    return {rows}
  }
}

const store = createStore({dataArr: null, rows: null})

export default store

