import React, { PureComponent, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Range, OrderedMap } from 'immutable'
import uuid from 'uuid'

import { WorkerHub } from './../lib/WorkerHub'
import c from './../constants/app-constants'
import Counter from './Counter.jsx'
import Arrows from './Arrows.jsx'

import './../styles/App.scss'

export default class App extends PureComponent {
  static propTypes = {
    amount: PropTypes.number
  }

  static defaultProps = {
    amount: 3
  }

  state = {
    connections: OrderedMap(),
    size: null
  }

  componentWillMount() {
    if (typeof (Worker) !== "undefined"){
      this.wh = new WorkerHub(this.props.amount, this.handleFlow)
    }
  }

  componentDidMount() {
    if(this.divElement) {
      const size = this.divElement.clientHeight
      this.setState({size})
    }
  }

  setRef = divElement => this.divElement = divElement

  findCenter = node => {
    const clientRect = ReactDOM.findDOMNode(node).getBoundingClientRect()

    return ({
      left: clientRect.left - this.divElement.offsetLeft + clientRect.width * 0.5,
      top: clientRect.top - this.divElement.offsetTop + clientRect.height * 0.5
    })
  }

  handleFlow = (from, to) => {
    const fromNode = this.refs[from.toString()]
    const toNode = this.refs[to.toString()]
    const id = uuid()
    this.setState({
      connections: this.state.connections.set(id, {
        from: this.findCenter(fromNode),
        to: this.findCenter(toNode),
        id
      })
    })

    setTimeout(() => {
      this.setState({
        connections: this.state.connections.delete(id)
      })
    }, c.UPDATE_DELAY)
  }

  renderCounter = (v, id) => <Counter hub={this.wh} id={id} key={id} ref={id}/>

  render() {
    const { amount } = this.props
    const { connections, size } = this.state
    if (typeof (Worker) === "undefined"){
      return (
        <div>{'Web Worker is not supported in your browser'}</div>
      )
    }

    return (
      <div className='counter' ref={this.setRef}>
        <Arrows connections={connections} size={size}/>
        <div className={`counter-container counter-container--${amount}`}>
          {Range(0, amount).map(this.renderCounter)}
        </div>
      </div>
    )
  }
}
