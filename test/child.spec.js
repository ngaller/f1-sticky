import React from 'react'
import { mount } from 'enzyme'
import {Component} from '../src/child'

describe('StickyChildComponent', () => {
  it('render its content', () => {
    const wrapper = mount(<Component parentScrollTop={0}><div className='mydiv' /></Component>)
    expect(wrapper.find('.mydiv')).to.have.length(1)
  })

  it('creates placeholder node', () => {
    const wrapper = mount(<Component parentScrollTop={0}><div className='mydiv' /></Component>)
    expect(wrapper.find('.sticky-spacer')).to.have.length(1)
  })

  it('sets className on child div', () => {
    const wrapper = mount(<Component className='foo' parentScrollTop={0}><div className='mydiv' /></Component>)
    expect(wrapper.find('div.sticky-child.foo')).to.have.length(1)
  })

  it('adjusts its position when scrolled past the top', (done) => {
    const wrapper = mount(<Component parentScrollTop={0}><div className='mydiv' /></Component>)
    wrapper.setProps({
      parentScrollTop: 123
    }, () => {
      const node = wrapper.find('.mydiv').get(0).parentNode
      expect(node.style.position).to.equal('absolute')
      expect(node.style.top).to.equal('123px')
      done()
    })
  })

  it('sets spacer margin when scrolled past the top', (done) => {
    const wrapper = mount(<Component parentScrollTop={0}><div className='mydiv' /></Component>)
    wrapper.setProps({
      parentScrollTop: 123
    }, () => {
      const node = wrapper.find('.sticky-spacer').get(0)
      expect(node.style.paddingBottom).to.be.ok
      done()
    })
  })

  it('resets position when not scrolled too much', () => {
    const wrapper = mount(<Component parentScrollTop={0}><div className='mydiv' /></Component>)
    wrapper.setProps({
      parentScrollTop: 123
    }, () => {
      wrapper.setProps({ parentScrollTop: 0 }, () => {
        setTimeout(() => {
          const node = wrapper.find('.mydiv').get(0).parentNode
          expect(node.style.position).to.equal('')
          done()
        }, 150)
      })
    })
  })
  // TODO need to write more tests for edge cases, with more complex layouts
})
