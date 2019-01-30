import * as React from 'react'
import {  NavLink } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

import * as style from './style.css'

const { Sider } = Layout;

interface IStoreProps {
  collapsed?: boolean
}

interface IState {
  collapsed: boolean
}

class NavMenu extends React.Component<IStoreProps, IState>{
  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className={style.iconBox}>
          <Icon type="cloud" className={style.cloud} />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <NavLink className={style.inb} to="/pageA">pageA</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <NavLink className={style.inb} to="/pageB">pageB</NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <NavLink className={style.inb} to="/pageC">pageC</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default NavMenu;