import {h, FunctionalComponent} from 'preact'
import {useEffect} from 'preact/hooks'
import {connect} from 'unistore/preact'
import GridTable from './components/GridTable'
import {actions, TDataArr} from './store'

type TProps = {
  setDataArr: () => void
  setCell: () => void
  dataArr: TDataArr
}

const App: FunctionalComponent<TProps> = ({setCell, setDataArr, dataArr}) => {

  useEffect(() => setDataArr(), [])

  return dataArr ? <GridTable dataArr={dataArr} setCell={setCell}/> : 'Initializing'
}

export default connect('dataArr', actions)(App)