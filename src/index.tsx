import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Switch, Route,NavLink } from 'react-router-dom'
import PageA from './views/PageA';
import PageB from './views/PageB';
import PageC from './views/PageC';
// import * as styles from './style.css'


const leftNav = () => {
  return (
    <nav>
      <ul>
        <li><NavLink activeStyle={{ color: 'blue' }} to="/pageA">com1</NavLink></li>
        <li><NavLink activeStyle={{ color: 'blue' }} to="/pageB">com2</NavLink></li>
        <li><NavLink activeStyle={{ color: 'blue' }} to="/pageC">com3</NavLink></li>
      </ul>
    </nav>
  )
};


class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Route render={({ location }) => (
          <div>
            <div>
              {leftNav()}
              <hr />
            </div>
            <div>
              <div key={location.pathname}>
                <Switch key={location.key} location={location}>
                  <Route exact path="/" component={PageA} />
                  <Route exact path="/pageA" component={PageA} />
                  <Route exact path="/pageB" component={PageB} />
                  <Route exact path="/pageC" component={PageC} />
                </Switch>
              </div>
            </div>
          </div>
        )} />
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
