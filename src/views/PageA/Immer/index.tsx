import React from 'react';
import produce from 'immer';

class IC extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.userList === nextProps.userList) {
      return false
    }
    return true
  }
  render() {
    const { userList } = this.props;
    return (
      <div>
        {
          userList.map(({ name, age }, idx) => {
            return (
              <div key={idx}>
                {name}->{age}
              </div>)
          })
        }
      </div>
    )
  }

}

class Immer extends React.Component<{}, any> {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        title: '任务一',
        time: 1,
      },
      userList: [
        {
          name: 'AAA',
          age: 20
        }, {
          name: 'BBB', age: 30
        }]
    }
  }
  changeStatus = () => {
    this.setState(produce((draft) => {
      draft.data.time++
    }))
  }
  addList = () => {
    this.setState(produce(draft => {
      draft.userList.push({ name: 'CCC', age: 40 })
    }))
  }

  render() {
    const { data, userList } = this.state;
    return (
      <div>
        <h3>Immer scu</h3>
        <button onClick={this.changeStatus}>changeStatus</button>
        <button onClick={this.addList}>addList</button>
        <br />
        <div>{data.title}-----> {data.time}</div>
        <IC userList={userList} />
      </div>
    )
  }
}
export default Immer;
