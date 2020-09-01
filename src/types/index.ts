import Row from 'gridjs/dist/src/row'
import {Moment} from 'moment'

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

export type TForDate = Date | Moment | string | null

export type DateInterval = {
  to: TForDate
  from: TForDate
}
