import isofetch from 'isomorphic-fetch'
import readBlob from 'read-blob'
import { createAction } from 'redux-actions'

import createUrlify from '../util/urlify'

const FETCH = 'EFFECT_FETCH'

function fetchMiddleware ({ dispatch, getState }) {
  return next => action => {
    if (action.type !== FETCH) {
      return next(action)
    }

    const urlify = createUrlify(action.payload.url)

    return isofetch(action.payload.url, action.payload.params)
      .then(checkStatus)
      .then(blobify)
      .then(textify)
      .catch((error) => {
        throw urlify({ error })
      })
    }
}

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    throw res
  }
}

function blobify (res) {
  return res.blob()
    .then((blob) => { 
      return {
        blob,
        url: res.url
      }
    })
}

function textify ({ blob, url }) {
  return readBlob(blob, 'text')
    .then(text => {
      return {
        type: blob.type,
        content: text,
        url
      }
    })
}

const fetch = createAction(
  FETCH,
  (url = '', params = {}) => {
    return { url, params }
  }
)

export default fetchMiddleware
export { fetch }
