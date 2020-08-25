import {h, FunctionalComponent} from 'preact'
import {useEffect, useRef, useState} from 'preact/hooks'
import {Grid, html} from 'gridjs'
import {TDataArr, TRows} from '../../store'

import 'gridjs/dist/theme/mermaid.min.css'
import './index.scss'

type TProps = {
  dataArr: TDataArr
  onRows: (rows: TRows) => void
}

const GridTable: FunctionalComponent<TProps> = ({dataArr, onRows}) => {
  const wrapperRef = useRef(null)
  const [gridObj, setGridObj] = useState(null)
  const [t, setT] = useState(false)

  const onC = () => {
    setT(!t)
    console.log(t)
  }

  useEffect(() => {
    const grid = new Grid({
      columns: [
        {
          name :'svcId',
          formatter: (cell, row) => t ? <span onClick={() => setT(false)}>cell</span> : <span onClick={() => setT(true)}>{cell}</span>
        },
        'ctime',
        'svcType',
        'userName',
        'feedback',
        'comment',
      ],
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

    grid.on('rowClick', (...args) => {
      onRows(JSON.parse(JSON.stringify(args)))
    })

    setGridObj(grid)

  }, [])

  useEffect(() => gridObj && gridObj.updateConfig({data: dataArr}).forceRender(), [dataArr])

  useEffect(() => gridObj && gridObj.updateConfig(
    {
      columns: [
        {
          name :'svcId',
          formatter: (cell, row) => t ? <span class='sett' onClick={() => setT(!t)}>cell</span> : <span onClick={() => setT(!t)}>{cell}</span>
        },
        {name: 'ctime'},
        {name: 'svcType'},
        {name: 'userName'},
        {name: 'feedback'},
        {name: 'comment'},
      ],
    }
    ).forceRender(), [t])

  return <div ref={wrapperRef}/>

}

export default GridTable