import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { initializeStore } from '../redux/index'


const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'


export function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }

  return window[__NEXT_REDUX_STORE__]
}


export default (TopApp) => {
  class AppWithRedux extends Component {
    static propTypes = { initialReduxState: PropTypes.object };

    static async getInitialProps (appCtx) {
      const store = getOrCreateStore()

      appCtx.ctx.store = store

      let appProps = {}

      if (typeof TopApp.getInitialProps === 'function') {
        appProps = await TopApp.getInitialProps(appCtx)
      }

      return {
        ...appProps,
        initialReduxState: store.getState()
      }
    }

    constructor (props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render () {
      return (
        <TopApp {...this.props} reduxStore={this.reduxStore} />
      )
    }
  }

  return AppWithRedux
}
