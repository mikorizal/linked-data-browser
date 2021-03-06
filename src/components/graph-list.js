/** @jsx el */
const el = require('vdom-element')
const sheetify = require('sheetify')
const map = require('lodash.map')

const prefix = sheetify('./graph-list.css')

module.exports = render

function render (props) {
  return <div className={ prefix }>
    <div className='error'>{
      props.error ? 'error!' : ''
    }</div>
    <ul className='list'>{
      map(props.graphs, (graph, id) => {
        const statusName = getStatusName(graph)
        const statusStyle = getStatusStyle(statusName)

        return <li className='item'>
          <span className='id'>
            { id }
          </span>
          <span className='status'
            style={statusStyle}
          >{ statusName }</span>
        </li>
      })
    }</ul>
  </div>
}

function getStatusName ({ error, content, redirect }) {
  if (error) {
    return 'errored'
  } else if (redirect) {
    return 'redirect'
  } else if (content === undefined) {
    return 'loading'
  } else {
    return 'success'
  }
}

function getStatusStyle (statusName) {
  switch (statusName) {
    case 'errored':
      return {
        color: 'red'
      }
    case 'loading':
      return {
        color: 'blue'
      }
    case 'redirect':
      return {
        color: 'black'
      }
    case 'success':
      return {
        color: 'green'
      }
  }
}
