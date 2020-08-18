import {h, FunctionalComponent} from 'preact'
import {useEffect, useRef, useState} from 'preact/hooks'
import {Grid} from 'gridjs'
import {TDataArr, TRows} from '../../store'

import 'gridjs/dist/theme/mermaid.min.css'
import './index.scss'

type TProps = {
  dataArr: TDataArr
  onRows: (rows: TRows) => void
}

const GridTable: FunctionalComponent<TProps> = ({dataArr, onRows}) => {
  const wrapperRef = useRef(null)
  const [gridObj, onGridObj] = useState(null)

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

    grid.on('rowClick', (...args) => onRows(JSON.parse(JSON.stringify(args))))
    onGridObj(grid)
  }, [])

  useEffect(() => gridObj && gridObj.updateConfig({data: dataArr}).forceRender(), [dataArr])

  return <div ref={wrapperRef}/>

}

export default GridTable