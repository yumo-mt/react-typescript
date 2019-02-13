import React from 'react'

class PageB extends React.Component<{}, {}> {
    componentDidMount = () => {
        Window.alex = 'alex'
    }

    render() {
        console.log(Window.alex)
        return <h1>PageB</h1>
    }
}

export default PageB
