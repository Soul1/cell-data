import {h, FunctionalComponent} from 'preact'
import {useEffect, useMemo, useState} from 'preact/hooks'
import GridTable from './components/GridTable'
import AdditionalTable from './components/AdditionalTable'
import FilterDate from './components/FilterDate'
import moment from 'moment'
import {DateInterval, TDataArr, TRow} from './types'

type TProps = {}

const App: FunctionalComponent<TProps> = () => {

  const [dateFilter, setDateFilter] = useState<DateInterval>({
    to: null,
    from: null
  })

  const [data, setData] = useState<TDataArr>(null)
  const [row, setRow] = useState<TRow>(null)

    const installDate = async (): void => {
    const res = await fetch('/data.json')
    const rows = await res.json()
    rows.forEach((row: TData) => row.ctime = moment(row.ctime).format('YYYY-MM-DD HH:mm'))
    setData(rows)
  }

  useEffect(installDate, [])

  const filteredData = useMemo(
    () => data && data.filter(({ctime}) => {
      return (!dateFilter.from || ctime >= dateFilter.from)
        && (!dateFilter.to || ctime <= dateFilter.to)
    }), [data, dateFilter])

  const columnNames = [
    {id: 'svcId',    name: '№'},
    {id: 'ctime',    name: 'Дата'},
    {id: 'svcType',  name: 'Тип'},
    {id: 'userName', name: 'Оператор'},
    {id: 'feedback', name: 'Оценка'},
    {id: 'comment',  name: 'Комментарий'}
  ]

  return (
    <div class='app'>
      <div className='main-table'>
        <FilterDate to={dateFilter.to} from={dateFilter.from} onChange={setDateFilter}/>
        {!!filteredData
          ? <GridTable
              columnNames={columnNames}
              data={filteredData}
              selected={row}
              onRow={setRow}
            />
          : 'Initializing'
        }
      </div>
      <div className='additional-table'>
        {!!row && <AdditionalTable row={row}/>}
      </div>
    </div>
  )
}

export default App
