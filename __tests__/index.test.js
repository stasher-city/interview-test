import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import Home from '../pages/index'

import { getOrCreateStore } from '../hoc/withReduxStore'

const store = getOrCreateStore()
const component = mount(
  <Provider store={store}>
    <Home />
  </Provider>
)


describe('Index', () => {
  it('renders properly', () => {
    expect.assertions(1)

    expect(component.html()).toMatchSnapshot()
  })
})
