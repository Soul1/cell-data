import {h, FunctionalComponent} from 'preact'
import {useEffect, useMemo, useState} from 'preact/hooks'
import {connect} from 'unistore/preact'
import GridTable from './components/GridTable'
import {actions, TDataArr, TRow} from './store'
import AdditionalTable from './components/AdditionalTable'
import FilterDate from './components/FilterDate'
import {Moment} from 'moment'

export type TForDate = Date | Moment | null

export type DateInterval  = {
  to: TForDate
  after: TForDate
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
    after: null
  })

  useEffect(() => setDataArr(), [])

  const filteredData = useMemo(
    () => dataArr && dataArr.filter(({ctime}) => {
      const date = new Date(ctime)
      return (!dateFilter.to || date >= dateFilter.to)
        && (!dateFilter.after || date <= dateFilter.after)
    }), [dataArr, dateFilter])


  return (
    <div class='app'>
      <div className='main-table'>
        <FilterDate onChange={setDateFilter}/>
        {!!filteredData ? <GridTable dataArr={filteredData} selected={row} onRow={setRow}/> : 'Initializing'}
      </div>
      <div className='additional-table'>
        {!!row && <AdditionalTable row={row}/>}
      </div>
    </div>
  )
}

export default connect(['dataArr', 'row'], actions)(App)