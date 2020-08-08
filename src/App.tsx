import {h, FunctionalComponent} from 'preact'
import {useEffect} from 'preact/hooks'
import {connect} from 'unistore/preact'
import GridTable from './components/GridTable'
import {actions} from './store'

type TProps = {
  setDataArr: () => void
  dataArr: []
}

const App: FunctionalComponent<TProps> = ({setDataArr, dataArr}) => {
  
  useEffect(() => setDataArr(), [])

  return dataArr ? <GridTable dataArr={dataArr}/> : 'Initializing'
}

export default connect('dataArr', actions)(App)