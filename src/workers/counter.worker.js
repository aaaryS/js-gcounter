import { Range, List } from 'immutable'
import { Worker } from './../lib/Worker'
import c from './../constants/app-constants'

let worker = null

const handlePostMessage = (data) => self.postMessage(data)

self.addEventListener('message', function(e) {
  switch(e.data.type) {
    case c.INITIALIZE_TYPE:
      worker = new Worker(e.data.payload, handlePostMessage)
      break
    case c.INCREMENT_TYPE:
      worker.increment()
      break
    case c.UPDATE_TYPE:
      worker.update(e.data.payload)
      break
  }
}, false)
