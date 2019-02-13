import React from 'react'

class JsDemo extends React.Component{
  render(){
    return (
      <div>
        <h3>this is js component</h3>
        <h3>props->{this.props.look}</h3>
      </div>
    )
  }
}

export default JsDemo;