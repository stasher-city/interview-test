import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'

import withReduxStore from '../hoc/withReduxStore'


class MyApp extends App {
  render () {
    const {
      Component,
      reduxStore,
      pageProps
    } = this.props

    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}


export default withReduxStore(MyApp)
