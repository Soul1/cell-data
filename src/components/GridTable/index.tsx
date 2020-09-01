import {h, FunctionalComponent} from 'preact'
import {useEffect, useRef, useState} from 'preact/hooks'
import {Grid} from 'gridjs'
import {TDataArr, TRow} from '../../types'

import 'gridjs/dist/theme/mermaid.min.css'
import './index.scss'

type TProps = {
  data: TDataArr
  columnNames: { id: string, name: string }[]
  selected: TRow
  onRow: (row: TRow) => void
}

const GridTable: FunctionalComponent<TProps> = ({data, columnNames, selected, onRow}) => {

  const wrapperRef = useRef(null)
  const [gridObj, setGridObj] = useState(null)

  const config = () => {
    const formatter = (cell: string, row: TRow) =>
      selected && selected.cells[0].data === row.cells[0].data
        ? <strong>{cell}</strong>
        : cell
    return {
      data,
      columns: columnNames.map((col) => ({formatter, ...col}))
    }
  }

  useEffect(() => {
    const grid = new Grid({
      data,
      search: true,
      sort: true,
      language: {
        search: {
          placeholder: '🔍 Поиск...'
        }
      }
    })
    grid.updateConfig(config())
    grid.render(wrapperRef.current)

    grid.on('rowClick', (_, row) => onRow(row))
    setGridObj(grid)
  }, [])

  useEffect(
    () => gridObj && gridObj.updateConfig(config()).forceRender(),
    [data, selected, columnNames])

  return <div ref={wrapperRef}/>
}

export default GridTable