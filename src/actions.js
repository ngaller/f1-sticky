// a function that will create the actions given a name
export default function stickyActions(name) {
  return {
    onScroll(scrollTop) {
      return { type: 'f1-sticky/SCROLL', payload: {scrollTop}, meta: {name} }
    },
    onResize(height, top) {
      return { type: 'f1-sticky/RESIZE', payload: {height, top}, meta: {name} }
    }
  }
}
