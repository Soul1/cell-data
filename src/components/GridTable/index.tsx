import {h, FunctionalComponent} from 'preact'
import {useEffect, useRef, useState} from 'preact/hooks'
import {Grid} from 'gridjs'
import {TDataArr, TRow} from '../../store'
import cn from 'classnames'

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

  const dataName = {
    svcId: '№',
    ctime: 'Дата',
    svcType: 'Тип',
    userName: 'Оператор',
    feedback: 'Оценка',
    comment: 'Комментарий'
  }

  const renameKeys = (obj: any, newKeys: any) => {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key
      return { [newKey]: obj[key] }
    })
    return Object.assign({}, ...keyValues)
  }

  const dataKeysRename = () => {
    return dataArr.map(obj => renameKeys(obj, dataName))
  }

  useEffect(() => {
    const grid = new Grid({
      data: dataKeysRename(),
      search: true,
      sort: true,
      language: {
        search: {
          placeholder: '🔍 Поиск...'
        }
      },
      className: {
        td: cn({'grid-td': dataArr.length})
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

    const columns = Object.values(dataName).map((name) => ({name, formatter}));

    const className = {td: cn({'grid-td': dataArr.length})}
    
    gridObj && gridObj.updateConfig({data: dataKeysRename(), columns, className}).forceRender()

  }, [dataArr, selected])

  return <div ref={wrapperRef}/>

}

export default GridTable