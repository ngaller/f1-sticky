import actions from '../src/actions'

describe('actions', () => {
  it('creates scroll action', () => {
    const creator = actions('named')
    const action = creator.onScroll(123)
    expect(action).to.eql({
      type: 'f1-sticky/SCROLL',
      payload: { scrollTop: 123 },
      meta: { name: 'named' }
    })
  })
  it('creates resize action', () => {
    const creator = actions('named')
    const action = creator.onResize(123, 10)
    expect(action).to.eql({
      type: 'f1-sticky/RESIZE',
      payload: { height: 123, top: 10 },
      meta: { name: 'named' }
    })
  })
})
