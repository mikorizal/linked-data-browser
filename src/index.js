import vdux from 'vdux'
import { listen } from 'virtual-component'
import { handleOnce } from 'redux-effects-events'
import el from 'vdom-element'

import createStore from './store'
import App from './app'

const store = createStore({
  focusId: 'https://rawgit.com/valueflows/agent/master/examples/enspiral.jsonld',
  triples: [],
  prefixes: {}
})

store.dispatch(handleOnce('domready', () => {
  listen(store.dispatch)
  vdux(store, (state) => {
    return <App { ...state } />
  }, document.body)
}))
