import {h, FunctionalComponent} from 'preact'
import {useEffect, useRef} from 'preact/hooks'
import {Grid} from 'gridjs'
import {TDataArr, TRows} from '../../store'

import 'gridjs/dist/theme/mermaid.min.css'
import './index.scss'

type TProps = {
  dataArr: TDataArr
  setRows: (rows: TRows) => void
}

const GridTable: FunctionalComponent<TProps> = ({dataArr, setRows}) => {
  const wrapperRef = useRef(null)

  useEffect(() => {
    const grid = new Grid({
      data: dataArr,
      search: true,
      sort: true,
      language: {
        search: {
          placeholder: '🔍 Поиск...'
        }
      },
      className: {
        container: 'grid-container'
      },
      height: '90vh',
      fixedHeader: true,
    }).render(wrapperRef.current)

    grid.on('rowClick', (...args) => setRows(JSON.parse(JSON.stringify(args))))

  }, [])

  return <div ref={wrapperRef}/>

}

export default GridTable