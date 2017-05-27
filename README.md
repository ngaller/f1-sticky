# f1-sticky

Simple sticky component for React-Redux projects.
Allows for a containing panel to have a "sticky" child: when the panel is
scrolled down past the child's top it remains at the top of it, allowing
the rest of the content to scroll.

* NOT ACTIVELY MAINTAINED *


## Install

`npm i f1-redux-fixed --save`

## Usage

In the containing component (the overflowing container):

```
import { StickyParent } from 'f1-sticky'

const Parent = () =>
    <StickyParent updateRate={10}>
        {/* some content... */}
        <Content />
    </StickyParent>
```

`updateRate` is optional but can be specified to limit the # of updates per
second.  It will slightly delay the component becoming "sticky" but can
improve performance on an app with a lot of components.

The parent needs to be the positioning anchor for the sticky child (i.e., `position: relative`)

In the child component:

```
import { StickyChild } from 'f1-sticky'

const Child = () =>
    <StickyChild>
      <SomeElement />
    </StickyChild>
```

You also need to include the reducer when you create your store:

```
import {reducer as stickyReducer} from 'f1-sticky'

const store = createStore(combineReducers({
  sticky: stickyReducer
  // ... other reducers ...
}))

```

Putting it together (see also the example in the `example` folder):

```
import React from 'react'

import {StickyParent, StickyChild} from 'f1-sticky'

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
```

## Limitations

 * You cannot currently have 2 sticky children.  Put them both under the same container, and make that container
the sticky
 * If you have more than 1 sticky parent / child in your page, you need to give them different
 names (pass a name prop to both parent and child)
 * There is a [react-sticky component](https://github.com/captivationsoftware/react-sticky)
that has a lot more options but is more complex and does not work well for a component that is
positioned relative to a container that is itself positioned relative to another one.

## Development

 * Use `npm start` to start a sample page
 * Use `npm test` to run the tests
 
## TODO

 * Use a private channel instead of redux to pass scroll info?
