import {h, FunctionalComponent} from 'preact'
import {useEffect, useRef} from 'preact/hooks'
import {Grid} from 'gridjs'
import {TDataArr} from '../../store'

import 'gridjs/dist/theme/mermaid.min.css'
import './index.scss'

type TProps = {
  dataArr: TDataArr
  setCell: () => void
}

const GridTable: FunctionalComponent<TProps> = ({dataArr}) => {
  const wrapperRef = useRef(null)

  useEffect(() => {
    const grid = new Grid({
      data: dataArr,
      search: true,
      language: {
        search: {
          placeholder: '🔍 Поиск...'
        },
        pagination: {
          previous: '⬅️',
          next: '➡️'
        }
      },
      pagination: {
        enabled: true,
        limit: 10,
        summary: false
      },
      className: {
        container: 'container',
        td: 'td',
      }
    }).render(wrapperRef.current)
  }, [])

  return <div ref={wrapperRef}/>
}

export default GridTable