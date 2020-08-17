import {h, FunctionalComponent} from 'preact'
import {StateUpdater} from 'preact/hooks'

import './index.scss'

type TProps = {
  setDateTo: StateUpdater<Date>
  setDateAfter: StateUpdater<Date>
}

const FilterDate: FunctionalComponent<TProps> = ({setDateTo, setDateAfter}) => {

  return (
    <div class='filter-date'>
      <div className="filter-date__to">
        <b>От</b>
        <input type="date" onChange={e => setDateTo(new Date(e.target.valueAsDate))}/>
      </div>
      <div className="filter-date__after">
        <b>До</b>
        <input type="date" onChange={e => setDateAfter(new Date(e.target.valueAsDate))}/>
      </div>
    </div>
  )
}

export default FilterDate