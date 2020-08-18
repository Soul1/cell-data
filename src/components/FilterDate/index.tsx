import {h, FunctionalComponent} from 'preact'
import {useEffect, useState} from 'preact/hooks'
import {DateInterval} from '../../App'

import './index.scss'

type TProps = {
  onChange: (interval: DateInterval) => void
}

const FilterDate: FunctionalComponent<TProps> = ({onChange}) => {
  const [dateTo, onDateTo] = useState<null | Date>(null)
  const [dateAfter, onDateAfter] = useState<null | Date>(null)

  useEffect(() =>
      onChange({to: dateTo, after: dateAfter}),
    [dateTo, dateAfter]
  )

  return (
    <div class='filter-date'>
      <div className="filter-date__to">
        <b>От</b>
        <input type="date" onChange={e => onDateTo(new Date(e.target.valueAsDate))}/>
      </div>
      <div className="filter-date__after">
        <b>До</b>
        <input type="date" onChange={e => onDateAfter(new Date(e.target.valueAsDate))}/>
      </div>
    </div>
  )
}

export default FilterDate