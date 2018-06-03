import React, { PureComponent, PropTypes } from 'react'
import { Range, OrderedMap } from 'immutable'
import uuid from 'uuid'

import { WorkerHub } from './../lib/WorkerHub'
import c from './../constants/app-constants'

import Arrows from './Arrows.jsx'

export default class ArrowFlow extends PureComponent {
  static propTypes = {
    amount: PropTypes.number,
    size: PropTypes.number,
    findCenter: PropTypes.func,
  }

  state = {
    connections: OrderedMap(),
  }

  componentWillMount() {
    if (typeof (Worker) !== "undefined"){
      this.wh = new WorkerHub(this.props.amount, this.handleFlow)
    }
  }

  handleFlow = (from, to) => {
    const fromNode = this.refs[from.toString()]
    const toNode = this.refs[to.toString()]
    const id = uuid()
    this.setState({
      connections: this.state.connections.set(id, {
        from: this.props.findCenter(fromNode),
        to: this.props.findCenter(toNode),
        id
      })
    })

    setTimeout(() => {
      this.setState({
        connections: this.state.connections.delete(id)
      })
    }, c.UPDATE_DELAY)
  }

  render() {
    const { connections } = this.state
    const { size, children } = this.props

    return(
      <div>
        <Arrows connections={connections} size={size}/>
        {children(this.wh)}
      </div>
    )
  }

}