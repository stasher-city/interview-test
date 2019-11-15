import PropTypes from 'prop-types'
import React, { useState } from 'react'
import moment from 'moment-mini'
import { connect } from 'react-redux'

import { SearchBar } from '../components/SearchBar'
import { Stashpoint } from '../components/Stashpoint'

import { getCoordsFromLocation } from '../utils/google'
import { getStashpoints } from '../utils/api'

import { updateQuery as updateQueryAction } from '../redux/actions'

import '../style/global.css'
import { title, box, page } from '../style/style.css'


const Home = ({ bags, dropOff, pickUp, updateQuery }) => {
  const [results, setResults] = useState([])

  const updateResults = async (searchVal) => {
    const resGeo = await getCoordsFromLocation(searchVal)

    const coords = resGeo.results[0].geometry.location
    const resStash = await getStashpoints({
      ...coords,
      bags,
      dropOff: dropOff.format('YYYY-MM-DDTHH:mm'),
      pickUp: pickUp.format('YYYY-MM-DDTHH:mm')
    })

    setResults(resStash)
  }

  const onBook = (id) => {}

  return (
    <div className={page}>
      <h3 className={title}>Stasher!</h3>

      <header className={box}>
        <SearchBar
          bags={bags}
          onUpdateQuery={updateQuery}
          dropOff={dropOff}
          pickUp={pickUp}
          onSearch={updateResults}
        />
      </header>

      <div>
        <ul>
          {results.map(r => <Stashpoint key={r.id} data={r} onBook={() => onBook(r.id) } />)}
        </ul>
      </div>
    </div>
  )
}

Home.propTypes = {
  bags: PropTypes.number,
  dropOff: PropTypes.instanceOf(moment),
  pickUp: PropTypes.instanceOf(moment),
  updateQuery: PropTypes.func
}

Home.defaultProps = {
  bags: 1,
  dropOff: moment(),
  pickUp: moment().add(1, 'hours')
}


const mapToProps = ({
  query: { bags, dropOff, pickUp }
}) => ({ bags, dropOff: moment(dropOff), pickUp: moment(pickUp) })

const mapDispatch = {
  updateQuery: updateQueryAction
}

export default connect(mapToProps, mapDispatch)(Home)
