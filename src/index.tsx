import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';
import NavMenu from './nav/index'
import PageA from './views/PageA';
import PageB from './views/PageB';
import PageC from './views/PageC';

import * as style from './style.css';

const { Header, Content } = Layout;
 

interface IState {
  collapsed: boolean
}
class App extends React.Component<object, IState> {
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    console.log(this.state.collapsed);
    
    return (
      <HashRouter>
        <Route render={({ location }) => (
          <Layout className={style.home}>
            <NavMenu collapsed={this.state.collapsed} />
            <Layout>
              <Header style={{ background: '#fff', paddingLeft: '15px' }}>
              </Header>
              <Content style={{
                margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
              }}
              >
                <Switch key={location.key} location={location}>
                  <Route exact path="/" component={PageA} />
                  <Route exact path="/pageA" component={PageA} />
                  <Route exact path="/pageB" component={PageB} />
                  <Route exact path="/pageC" component={PageC} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        )} 
        />
      </HashRouter>
    )
  }
};

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app') as HTMLElement
  )
}
render(App)
