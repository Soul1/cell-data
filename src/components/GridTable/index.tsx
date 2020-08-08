import {h, FunctionalComponent} from 'preact'
import {useEffect, useRef} from 'preact/hooks'
import {Grid} from 'gridjs'

type TProps = {
  dataArr: []
}

const GridTable: FunctionalComponent<TProps> = ({dataArr}) => {

  const wrapperRef = useRef(null)

  const grid = new Grid({
    search: true,
    data: dataArr,
    pagination: {
      enabled: true,
      limit: 10,
      summary: false
    },
    className: {
      container: 'container',
      td: 'td',
    }
  })

  useEffect(() => {
    grid.render(wrapperRef.current)
  }, [])

  return <div ref={wrapperRef}/>
}

export default GridTable