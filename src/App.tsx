import {h, FunctionalComponent} from 'preact'
import {useEffect, useMemo, useState} from 'preact/hooks'
import {connect} from 'unistore/preact'
import GridTable from './components/GridTable'
import {actions, TDataArr, TRows} from './store'
import AdditionalTable from './components/AdditionalTable'
import FilterDate from './components/FilterDate'

export type DateInterval  = {
  to: Date | null
  after: Date | null
}

type TProps = {
  onDataArr: () => void
  onRows: (rows: TRows) => void
  dataArr: TDataArr
  rows: TRows
}

const App: FunctionalComponent<TProps> = ({onRows, onDataArr, dataArr,  rows}) => {

  const [dateFilter, onDateFilter] = useState<DateInterval>({
    to: null,
    after: null
  })

  useEffect(() => onDataArr(), [])

  const filteredData = useMemo(
    () => dataArr && dataArr.filter(({ctime}) => {
      const date = new Date(ctime)
      return (!dateFilter.to || date >= dateFilter.to)
        && (!dateFilter.after || date <= dateFilter.after)
    }), [dataArr, dateFilter])

  return (
    <div class='app'>
      <div className='main-table'>
        <FilterDate onChange={onDateFilter}/>
        {!!filteredData ? <GridTable dataArr={filteredData} onRows={onRows}/> : 'Initializing'}
      </div>
      <div className='additional-table'>
        {!!rows && <AdditionalTable rows={rows}/>}
      </div>
    </div>
  )
}

export default connect(['dataArr', 'rows'], actions)(App)