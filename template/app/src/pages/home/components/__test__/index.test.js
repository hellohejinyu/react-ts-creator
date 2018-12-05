import { shallow } from 'enzyme'
import React from 'react'

import Test from '../Test'

describe('Test', function () {
  it('render correct', function () {
    expect(shallow(<Test title='Hello World' />).contains(<h1>Hello World</h1>)).toBeTruthy()
  })
})