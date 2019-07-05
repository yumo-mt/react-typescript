import React from 'react'

interface IState {
    data: any
}
class PageB extends React.Component<{}, IState> {
    constructor(props) {
        super(props)
        this.data = {
            a: 1,
            b: 1,
        }
        this.state = {
            data: this.data
        };
        setTimeout(() => {
            this.data.b = 2;
        }, 3000);
    }
    componentDidMount = () => {

    }
    change = () => {
        const state = this.state.data;
        console.log(state);
        state.a = 2;
        this.setState({
            data: state
        })
    }
    render() {
        return (
            <div>
                <h1>PageB</h1>
                <button onClick={this.change}>change</button>
                <div>{this.state.data.a}</div>
                <div>{this.state.data.b}</div>
            </div>)
    }
}

export default PageB
