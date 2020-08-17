import {h, FunctionalComponent} from 'preact'
import {useEffect, useState} from 'preact/hooks'
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
  const [dateTo, setDateTo] = useState<null | Date>(null)
  const [dateAfter, setDateAfter] = useState<null | Date>(null)
  const [resultFilterData, setResultFilterData] = useState<null | TDataArr>(null)

    !!dateTo && !!dateAfter ? setResultFilterData(dataArr.filter(a => {
      const date = new Date(a.ctime)
      return (date >= dateTo && date <= dateAfter)}
      )) : dataArr

  useEffect(() => {
    if (resultFilterData !== null && resultFilterData.length > 0 && resultFilterData !== dataArr) {
      setFilterDateDataArr(resultFilterData)
    }
  }, [resultFilterData])

  useEffect(() => setDataArr(), [])

  return (
    <div class='app'>
      <div className='main-table'>
        <FilterDate setDateTo={setDateTo} setDateAfter={setDateAfter}/>
        {!!dataArr ? <GridTable dataArr={dataArr} setRows={setRows} filterDateDataArr={filterDateDataArr}/> : 'Initializing'}
      </div>
      <div className='additional-table'>
        {!!rows && <AdditionalTable rows={rows}/>}
      </div>
    </div>
  )
}

export default connect(['dataArr', 'rows', 'filterDateDataArr'], actions)(App)