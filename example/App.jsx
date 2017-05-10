import React from 'react'

import StickyParent from '../src/parent'
import StickyChild from '../src/child'

const App = () =>
  <div className="outer">
    <div className="left">
      I am left bar
    </div>
    <main>
      <div className="search-bar">
        I am top bar. I stay visible.
      </div>
      <div className="content">
        <StickyParent className="scroller">
          <div className="filterbar">I am filter. I hide when we start scrolling</div>
          <StickyChild><div className="innersticky">I am sticky</div></StickyChild>
          <div className="placeholder"></div>
          <div className="bottom">I am not sticky</div>
        </StickyParent>
      </div>
    </main>
  </div>

export default App
