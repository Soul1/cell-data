import {h, FunctionalComponent} from 'preact'
import {useEffect} from 'preact/hooks'
import {connect} from 'unistore/preact'
import GridTable from './components/GridTable'
import {actions, TDataArr, TRows} from './store'
import AdditionalTable from './components/AdditionalTable'

type TProps = {
  setDataArr: () => void
  setRows: (row: TRows) => void
  dataArr: TDataArr
  rows: TRows
}

const App: FunctionalComponent<TProps> = ({setRows, setDataArr, dataArr, rows}) => {

  useEffect(() => setDataArr(), [])
  return (
    <div class='app'>
      <div className='main-table'>
        {!!dataArr ? <GridTable dataArr={dataArr} setRows={setRows}/> : 'Initializing'}
      </div>
      <div className='additional-table'>
        {!!rows && <AdditionalTable rows={rows}/>}
      </div>
    </div>
  )
}

export default connect(['dataArr', 'rows'], actions)(App)