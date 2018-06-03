import React, { PureComponent, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Range } from 'immutable'

import Counter from './Counter.jsx'

import ArrowFlow from './ArrowFlow.jsx'

import withSize from './../decorators/withSize.jsx'

import './../styles/App.scss'

@withSize
export default class App extends PureComponent {
  static propTypes = {
    amount: PropTypes.number,
    size: PropTypes.number,
    findCenter: PropTypes.func,
  }

  static defaultProps = {
    amount: 3
  }

  renderCounter = hub => (v, id) => <Counter hub={hub} id={id} key={id} ref={id}/>

  render() {
    const { amount, size, findCenter } = this.props

    if (typeof (Worker) === "undefined"){
      return (
        <div>{'Web Worker is not supported in your browser'}</div>
      )
    }

    return (
      <div className='counter'>
        <ArrowFlow amount={amount} size={size} findCenter={findCenter}>
        {
          (hub) => (
            <div className={`counter-container counter-container--${amount}`}>
              {Range(0, amount).map(this.renderCounter(hub))}
            </div>
          )
        }
        </ArrowFlow>
      </div>
    )
  }
}
