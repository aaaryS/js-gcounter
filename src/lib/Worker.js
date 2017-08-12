import { Range, List, OrderedMap } from 'immutable'

import c from './../constants/app-constants'
import { generateRandomId, generateRandomTime} from './../utils/helpers'
import { GCounter } from './GCounter'

export class Worker {
  constructor(data, postMessage) {
    this.gc = new GCounter(data.nodes, data.id)
    this.postMessage = postMessage

    this.scheduleUpdate()
  }

  update = data => {
    this.gc.merge(List(data.nodes))
    this.handleQueryMessage()
  }

  increment = () => {
    this.gc.increment()
    this.handleQueryMessage()
  }

   handleQueryMessage = () => {
    this.postMessage({
      type: c.QUERY_TYPE,
      payload: {
        value: this.gc.query()
      }
    })
  }

  scheduleUpdate = () => setTimeout(() => {
    this.postMessage({
      type: c.UPDATE_TYPE,
      payload: {
        nodes: this.gc.getNodes(),
        id: generateRandomId(this.gc.getNodesLength() - 1, this.gc.getID())
      }
    })
    this.scheduleUpdate()
  }, generateRandomTime(1, 5))
}
