import {h, FunctionalComponent} from 'preact'
import {TRow} from '../../store'

import './index.scss'

type TProps = {
  row: TRow
}

const AdditionalTable: FunctionalComponent<TProps> = ({row}) => {
  const dataName = ['id', 'Дата', 'Тип', 'Имя оператора', 'Оценка клиента', 'Комментарий']
  return (
    <div class='add-table'>
      <div class='add-table__info'>
        {dataName.map(name => <div class='add-table__info-row'>{name}</div>)}
      </div>
      <div class='add-table__main'>
        {row.cells.map(cell => <div class='add-table__main-row'>{cell.data}</div>)}
      </div>
    </div>
  )
}

export default AdditionalTable