import React from 'react';
import { fromJS, Map } from 'immutable';

interface IState {
  list: any
  historyList: any
}

class ImmutableComponent extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      list: fromJS({
        status: '青铜',
      }),
      historyList: []
    }
  }
  go = () => {
    const current = this.state.list;
    const historyList = this.state.historyList;
    historyList.push(current.toJS());
    let nextState = ''
    switch (current.get('status')) {
      case '青铜':
        nextState = current.set('status', '白银')
        break;
      case '白银':
        nextState = current.set('status', '黄金')
        break;
      case '黄金':
        nextState = current.set('status', '铂金')
        break;
      case '铂金':
        nextState = current.set('status', '钻石')
        break;
      default:
        nextState = current.set('status', '王者')
        break;
    }
    this.setState({
      historyList,
      list: nextState
    })
  }
  backTo = (status) => {
    const state = this.state.historyList.filter(i => i.status === status)
    this.setState({
      list: Map(state[0])
    })

  }
  render() {
    const historyList = this.state.historyList;
    return (
      <div>
        <h2>immutable 数据回滚</h2>
        <div>historyList</div>
        we can back to {
          historyList.map((i, idx) => { return <button onClick={() => { this.backTo(i.status) }} key={idx}>backto{i.status}</button> })
        }
        <br />
        <button onClick={this.go}>进阶</button>
        <div>{this.state.list.get('status')}</div>
      </div>)
  }
}

export default ImmutableComponent;
