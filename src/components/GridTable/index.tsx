import {h, FunctionalComponent} from 'preact'
import {useEffect, useRef, useState} from 'preact/hooks'
import {Grid} from 'gridjs'
import {TDataArr, TRow} from '../../store'

import 'gridjs/dist/theme/mermaid.min.css'
import './index.scss'

type TProps = {
  dataArr: TDataArr
  selected: TRow
  onRow: (row: TRow) => void
}

const GridTable: FunctionalComponent<TProps> = ({selected, dataArr, onRow}) => {
  const wrapperRef = useRef(null)
  const [gridObj, setGridObj] = useState(null)

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
      }
    }).render(wrapperRef.current)

    grid.on('rowClick', (_, row) => onRow(row))
    setGridObj(grid)

  }, [])

  useEffect(() => {
    const formatter = (cell: string, row: TRow) =>
      selected && selected.cells[0].data === row.cells[0].data
        ? <strong>{cell}</strong>
        : cell

    const columns = [
      'svcId', 'ctime', 'svcType',
      'userName', 'feedback', 'comment',
    ].map((name) => ({name, formatter}));

    gridObj && gridObj.updateConfig({data: dataArr, columns}).forceRender()

  }, [dataArr, selected])

  return <div ref={wrapperRef}/>

}

export default GridTable