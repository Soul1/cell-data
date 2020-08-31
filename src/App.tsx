import {h, FunctionalComponent} from 'preact'
import {useEffect, useMemo, useState} from 'preact/hooks'
import {connect} from 'unistore/preact'
import GridTable from './components/GridTable'
import {actions, TDataArr, TRow} from './store'
import AdditionalTable from './components/AdditionalTable'
import FilterDate from './components/FilterDate'
import moment, {Moment} from 'moment'

export type TForDate = Date | Moment | string | null

export type DateInterval = {
  to: TForDate
  from: TForDate
}

type TProps = {
  setDataArr: () => void
  setRow: (row: TRow) => void
  dataArr: TDataArr
  row: TRow
}

const App: FunctionalComponent<TProps> = ({setRow, setDataArr, dataArr,  row}) => {

  const [dateFilter, setDateFilter] = useState<DateInterval>({
    to: null,
    from: null
  })

  const readableDate = () => dataArr && dataArr.map(data => {
    return Object.assign(data, {ctime: moment(data.ctime).format('YYYY-MM-DD HH:mm')})
  })

  useEffect(() => setDataArr(), [])

  readableDate()

  const filteredData = useMemo(
    () => dataArr && dataArr.filter(({ctime}) => {
      return (!dateFilter.from || ctime >= dateFilter.from)
        && (!dateFilter.to || ctime <= dateFilter.to)
    }), [dataArr, dateFilter])

  return (
    <div class='app'>
      <div className='main-table'>
        <FilterDate to={dateFilter.to} from={dateFilter.from} onChange={setDateFilter}/>
        {!!filteredData ? <GridTable dataArr={filteredData} selected={row} onRow={setRow}/> : 'Initializing'}
      </div>
      <div className='additional-table'>
        {!!row && <AdditionalTable row={row}/>}
      </div>
    </div>
  )
}

export default connect(['dataArr', 'row'], actions)(App)