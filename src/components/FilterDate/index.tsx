import {h, FunctionalComponent} from 'preact'
import {useEffect, useState} from 'preact/hooks'
import {DateInterval, TForDate} from '../../App'
import moment from 'moment'

import './index.scss'

type TProps = {
  onChange: (interval: DateInterval) => void
}

const FilterDate: FunctionalComponent<TProps> = ({onChange}) => {
  const [dateTo, setDateTo] = useState<TForDate>(null)
  const [dateAfter, setDateAfter] = useState<TForDate>(null)

  const lastWeekFilter = () => {
    onChange(
      {
        to: moment().subtract(1, 'week').startOf('week').day(1),
        after: moment().subtract(1, 'week').endOf('week').day(7)
      })
    setDateTo(moment().subtract(1, 'week').startOf('week').day(1))
    setDateAfter(moment().subtract(1, 'week').startOf('week').day(7))
  }

  useEffect(() =>
      onChange({to: dateTo, after: dateAfter}),
    [dateTo, dateAfter]
  )

  return (
    <div class='filter-date'>
      <div className="filter-date__set">
        <div className="filter-date__to">
          <b>От</b>
          <input type="date" onChange={e => setDateTo(new Date(e.target.valueAsDate))} value={dateTo && moment(dateTo).format('YYYY-MM-DD')}/>
        </div>
        <div className="filter-date__after">
          <b>До</b>
          <input type="date" onChange={e => setDateAfter(new Date(e.target.valueAsDate))} value={dateAfter && moment(dateAfter).format('YYYY-MM-DD')}/>
        </div>
      </div>
      <div className="filter-date__frequently-used">
        <div onClick={lastWeekFilter}>За прошлую неделю</div>
      </div>
    </div>
  )
}

export default FilterDate