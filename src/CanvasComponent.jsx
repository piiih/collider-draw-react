import React from 'react'

// this could be "values" from ramda
const values = (object) => {
  return Object.keys(object)
    .map(key => object[key])
}

function polygon(props) {
  const {ctx, points} = props

  props.points.forEach((point, index) => {
    cords = values(point)
    index <= 0
      ? ctx.moveTo(...cords)
      : ctx.lineTo(...cords)
  })
}

function drawPolygon(props) {
  polygon(props)
  const {ctx} = props
  ctx.fill()
}

class CanvasComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      points: [],
      mouseX: 0, 
      mouseY: 0
    }
  }

  componentDidMount() {
    this.updateCanvas()
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d')
  }

  handleOnClick() {
    const ctx = this.refs.canvas.getContext('2d')

    const point = {
      x: this.state.mouseX,
      y: this.state.mouseY,
    }
    
    const points = [
      ...this.state.points,
      point,
    ]

    this.setState(
      { points },
      () => { drawPolygon({
        points: this.state.points,
        ctx,
      })
    })
  }

  handleMouseMove(e) {
    this.setState({
      mouseX: e.pageX,
      mouseY:e.pageY,
    })
  }

  handleOnHold() {
  }

  render() {
    return (
      <canvas
        ref="canvas"
        onMouseMove={this.handleMouseMove.bind(this)}
        onClick={this.handleOnClick.bind(this)}
        style={{border: this.props.border}}
        width={300}
        height={300}
      />
    )
  }
}

export default CanvasComponent
