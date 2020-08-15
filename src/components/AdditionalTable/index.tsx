import {h, FunctionalComponent} from 'preact'
import {TRows} from '../../store'

import './index.scss'

type TProps = {
  rows: TRows
}

const AdditionalTable: FunctionalComponent<TProps> = ({rows}) => {
const dataName = ['id', 'Дата', 'Тип', 'Имя оператора', 'Оценка клиента', 'Комментарий']
  return (
    <div class='add-table'>
      <div class='add-table__info'>
        {dataName.map(name => <div class='add-table__info-row'>{name}</div>)}
      </div>
      <div class='add-table__main'>
        {rows[1]._cells.map( row => <div class='add-table__main-row'>{row.data}</div>)}
      </div>
    </div>

  )

}

export default AdditionalTable