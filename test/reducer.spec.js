import reducer from '../src/reducer.js'

describe('createReducer', () => {
  it('returns a function', () => {
    const f = reducer
    expect(f).to.be.a('function')
  })

  it('handles sticky actions', () => {
    const state = reducer({}, {
      type: 'f1-sticky/SCROLL',
      payload: { scrollTop: 200 },
      meta: { name: 'named' }
    })
    expect(state.named.scrollTop).to.equal(200)
  })
})
