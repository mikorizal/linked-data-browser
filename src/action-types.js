import createActionTypes from 'create-action-types'

const actionTypes = createActionTypes([
  'SELECT_FOCUS',
  'REQUEST_GRAPH',
  'RECEIVE_GRAPH',
  'ERRORED_GRAPH',
  'RECEIVE_PREFIXES',
  'RECEIVE_QUADS',
  'SET_ERROR'
])

module.exports = actionTypes