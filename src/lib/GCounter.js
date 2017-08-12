import { List, Range } from 'immutable'

export class GCounter {
  constructor(number, id) {
    this.nodes = Range(0, number).reduce((acc) => acc.push(0), List())
    this.id = id
  }

  increment = () => {
    this.nodes = this.nodes.set(this.id, this.nodes.get(this.id) + 1)
  }

  query = () => this.nodes.reduce((acc, n) => acc + n, 0)

  merge = (newNodes) => {
    this.nodes = this.nodes.map(
      (node, key) => node > newNodes.get(key) ? node : newNodes.get(key)
    )
  }

  getNodes = () => this.nodes.toJS()

  getID = () => this.id

  getNodesLength = () => this.nodes.size
}
