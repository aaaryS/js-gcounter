import React, { PureComponent, PropTypes } from 'react'
import { List } from 'immutable'

import './../styles/Arrows.scss'

export default class Arrows extends PureComponent {
  static propTypes = {
    connections: PropTypes.object,
    size: PropTypes.number,
  }

  static defaultProps = {
    connections: List(),
    size: 0
  }

  getPath = (from, to, p = this.props) => {
    return `M${from.left} ${from.top} Q ${p.size/2} ${p.size/2} ${to.left} ${to.top}`
  }

  renderArrow = ({from, to, id}) => (
    <path
      d={this.getPath(from, to)}
      key={id}
      fill='transparent'
      className='counter-arrow-container__path'
    />
  )

  render() {
    const { connections, size } = this.props
    if (!size) return <div/>

    return (
      <div className='counter-arrow-container'>
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          {connections.map(this.renderArrow).toList()}
        </svg>
      </div>
    )
  }
}
