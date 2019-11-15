import moment from 'moment-mini'
import { combineReducers } from 'redux'


export const defaultState = {
  query: {
    bags: 1,
    dropOff: moment().format(),
    pickUp: moment().add(1, 'hours').format()
  }
}

const updateQueryReducer = () => {
  return (currentState = {}, { type, payload }) => {
    switch (type) {
      case 'UPDATE_QUERY': {
        let bags = currentState.bags
        let dropOff = currentState.dropOff
        let pickUp = currentState.pickUp

        if (payload && payload.bags) {
          bags = payload.bags
        }

        if (payload && payload.dropOff) {
          dropOff = payload.dropOff.format()
        }

        if (payload && payload.pickUp) {
          pickUp = payload.pickUp.format()
        }

        return { bags, dropOff, pickUp }
      }

      case 'CLEAR_QUERY':
        return {}

      default:
        return currentState
    }
  }
}

export const reducers = combineReducers({ query: updateQueryReducer() })
