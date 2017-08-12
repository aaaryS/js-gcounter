import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import c from './../constants/app-constants'

import './../styles/Counter.scss'

export default class Counter extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    hub: PropTypes.object.isRequired,
  }

  state = {
    counter: 0,
    clicked: false
  }

  componentWillMount() {
    const { hub, id } = this.props
    hub.registerHandler(id, this.onWorkerResponse)
    document.addEventListener('keydown', this.onKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress)
  }

  onWorkerResponse = counter => this.setState({counter})

  onKeyPress = e => {
    if((this.props.id + 1).toString() === e.key) this.onIncrement()
  }

  onClick = () => this.onIncrement()

  onIncrement = (p = this.props, s = this.state) => {
    this.setState({counter: s.counter + 1, clicked: true})
    p.hub.increment(p.id)
    this.resetClickedState()
  }

  resetClickedState = () => setTimeout(() => this.setState({clicked: false}), c.RESET_CLICKED_STATE)

  render() {
    const { id } = this.props
    const { counter, clicked } = this.state

    const classes = classnames('counter-container__item', {
      'counter-container__item--clicked': clicked
    })
    return (
     <div className={classes}>
        <header className='counter-container__item__header'>
          {`Counter No.${id + 1}`}
        </header>
        <div className='counter-container__item__value'>{counter}</div>
        <button className='counter-container__item__button' onClick={this.onClick}>
          {'Increment'}
        </button>
     </div>
    )
  }
}
