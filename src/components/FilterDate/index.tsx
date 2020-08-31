import {h, FunctionalComponent, JSX} from 'preact'
import {DateInterval, TForDate} from '../../App'
import moment from 'moment'

import './index.scss'

type TProps = {
  onChange: (interval: DateInterval) => void
  to: TForDate
  from: TForDate
}

const FilterDate: FunctionalComponent<TProps> = ({onChange, to, from}) => {

  const lastWeekFilter = (e: JSX.TargetedEvent, weekNum: number) => {
    e.preventDefault()
    onChange(
      {
        from: moment(moment().subtract(weekNum, 'week').startOf('week').day(1)).format('YYYY-MM-DD') ,
        to: moment(moment().subtract(weekNum, 'week').startOf('week').day(7)).format('YYYY-MM-DD')
      })
  }

  return (
    <div class='filter-date'>
      <div className='filter-date__set'>
        <div className='filter-date__to'>
          <b>От</b>
          <input type='date'
                 onChange={e => onChange({from: (e.target as HTMLInputElement).valueAsDate})}
                 value={from && moment(from).format('YYYY-MM-DD')}/>
        </div>
        <div className='filter-date__after'>
          <b>До</b>
          <input type='date'
                 onChange={e => onChange({to: (e.target as HTMLInputElement).valueAsDate})}
                 value={to && moment(to).format('YYYY-MM-DD')}/>
        </div>
      </div>
      <ul className='filter-date__frequently-used'>
        <li>
          <a href='#' onClick={e => lastWeekFilter(e, 1)}>За прошлую неделю</a>
        </li>
        <li>
          <a href='#' onClick={e => lastWeekFilter(e, 0)}>За текущую неделю</a>
        </li>
      </ul>
    </div>
  )
}

export default FilterDate