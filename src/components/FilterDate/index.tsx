import {h, FunctionalComponent} from 'preact'

import './index.scss'
import {TDataArr} from '../../store'
import {useEffect, useState} from 'preact/hooks'

type TProps = {
  dataArr: TDataArr
  setFilterDateDataArr: (filterDateDataArr: TDataArr) => void
}

const FilterDate: FunctionalComponent<TProps> = ({dataArr, setFilterDateDataArr}) => {
  const [dateTo, setDateTo] = useState<null | Date>(null)
  const [dateAfter, setDateAfter] = useState<null | Date>(null)

  const resultFilterData: any = !!dataArr && !!dateTo && !!dateAfter ? dataArr.filter(a => {
      const date = new Date(a.ctime)
      return (date >= dateTo && date <= dateAfter)
    }) : dataArr

  useEffect(() => {
    if (resultFilterData !== null && resultFilterData.length > 0 && resultFilterData !== dataArr) {
      setFilterDateDataArr(resultFilterData)
    }
  }, [resultFilterData])

  console.log(resultFilterData, 1)

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