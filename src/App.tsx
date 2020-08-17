import {h, FunctionalComponent} from 'preact'
import {useEffect} from 'preact/hooks'
import {connect} from 'unistore/preact'
import GridTable from './components/GridTable'
import {actions, TDataArr, TRows} from './store'
import AdditionalTable from './components/AdditionalTable'
import FilterDate from './components/FilterDate'

type TProps = {
  setDataArr: () => void
  setRows: (row: TRows) => void
  setFilterDateDataArr: (filterDateDataArr: TDataArr) => void
  dataArr: TDataArr
  filterDateDataArr: TDataArr
  rows: TRows
}

const App: FunctionalComponent<TProps> = ({setRows, setDataArr, setFilterDateDataArr, dataArr, filterDateDataArr, rows}) => {

  useEffect(() => setDataArr(), [])
  return (
    <div class='app'>
      <div className='main-table'>
        <FilterDate dataArr={dataArr} setFilterDateDataArr={setFilterDateDataArr}/>
        {!!dataArr ? <GridTable dataArr={dataArr} setRows={setRows} filterDateDataArr={filterDateDataArr}/> : 'Initializing'}
      </div>
      <div className='additional-table'>
        {!!rows && <AdditionalTable rows={rows}/>}
      </div>
    </div>
  )
}

export default connect(['dataArr', 'rows', 'filterDateDataArr'], actions)(App)