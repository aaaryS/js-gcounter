import React from 'react'
import ReactDOM from 'react-dom'

const withSize = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      size: null,
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
      const childrenDivElement = this.divElement.children[0]

      return ({
        left: clientRect.left - childrenDivElement.offsetLeft + clientRect.width * 0.5,
        top: clientRect.top - childrenDivElement.offsetTop + clientRect.height * 0.5
      })
    }

    render() {
      return (
        <div ref={this.setRef}>
          <WrappedComponent size={this.state.size} findCenter={this.findCenter}/>
        </div>
      )
    }
  }
}

export default withSize
