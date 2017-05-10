'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stickyActions;
// a function that will create the actions given a name
function stickyActions(name) {
  return {
    onScroll: function onScroll(scrollTop) {
      return { type: 'f1-sticky/SCROLL', payload: { scrollTop: scrollTop }, meta: { name: name } };
    },
    onResize: function onResize(height, top) {
      return { type: 'f1-sticky/RESIZE', payload: { height: height, top: top }, meta: { name: name } };
    }
  };
}