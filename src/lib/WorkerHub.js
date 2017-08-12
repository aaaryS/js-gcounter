import { Range, List, OrderedMap } from 'immutable'

const CustomWorker = require("./../workers/counter.worker.js")
import c from './../constants/app-constants'

const noop = () => {}

export class WorkerHub {
  constructor(nodes = 3, flowHandler = noop) {
    this.nodes = nodes
    this.handlers = Range(0, nodes).reduce((acc, id) => acc.set(id, () => {}), OrderedMap())
    this.workers = Range(0, nodes).reduce((acc, id) => {
      const worker = new CustomWorker()

      worker.addEventListener('message', this.handleWorkerMessage(id))
      worker.postMessage({
        type: c.INITIALIZE_TYPE,
        payload: {
          id,
          nodes
        }
      })

      return acc.push(worker)
    }, List())

    this.flowHandler = flowHandler
  }

  registerHandler = (id, callback) => {
    this.handlers = this.handlers.set(id, callback)
  }

  handleWorkerMessage = id => e => {
    if(e.data.type === c.QUERY_TYPE) {
      this.handlers.get(id)(e.data.payload.value)
    }

    if(e.data.type === c.UPDATE_TYPE) {
      this.sendMessage(e.data.payload.id, {
        nodes: e.data.payload.nodes
      }, c.UPDATE_TYPE)

      this.flowHandler(id, e.data.payload.id)
    }
  }

  increment = (id, value) => {
    this.sendMessage(id, {}, c.INCREMENT_TYPE)
  }

  sendMessage = (id, payload, type) => {
    this.workers.get(id).postMessage({
      type,
      payload
    })
  }
}
