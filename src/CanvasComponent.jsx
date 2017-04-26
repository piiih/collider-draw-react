import React from 'react';

function polygon(props) {
    const {ctx, points} = props

    const objectToArray = (object) => {
        return Object.keys(object).map(function (key) { return object[key] })
    }

    props.points.forEach((point, index) => {
        point = objectToArray(point)
        index <= 0 ? 
            ctx.moveTo(...point):
            ctx.lineTo(...point)
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
            mouseX:0, 
            mouseY:0
        }
    }

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d')
    }

    handleOnClick() {
        const ctx = this.refs.canvas.getContext('2d')

        const points = this.state.points.slice()

        const createPoint = props => {
            const point = {x:props.x, y:props.y}
            return point
        }

        const point = createPoint({x:this.state.mouseX, y:this.state.mouseY})

        points.push(point)

        this.setState({points:points}, () => {
            drawPolygon({ctx, points:this.state.points})
        })
    }

    handleMouseMove(e) {
        this.setState({mouseX:e.pageX, mouseY:e.pageY})
    }

    handleOnHold() {
    }

    render() {
        return (
            <canvas ref="canvas" onMouseMove={this.handleMouseMove.bind(this)} onClick={this.handleOnClick.bind(this)} style={{border : this.props.border}} width={300} height={300}/>
        );
    }
}

export default CanvasComponent;
