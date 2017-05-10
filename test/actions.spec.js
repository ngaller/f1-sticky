import actions from '../src/actions'

describe('actions', () => {
  it('creates actions with given name', () => {
    const creator = actions('named')
    const action = creator.onScroll(123)
    expect(action).to.eql({
      type: 'f1-sticky/SCROLL',
      payload: { scrollTop: 123 },
      meta: { name: 'named' }
    })
  })
})
