import * as React from 'react'
import { fromJS, Map, List, is } from 'immutable'
import { Button } from 'antd'
import Immer from './Immer';

import * as style from './style.css'

interface IdCardProps {
    weapons: string
    name: string
}

class IdCard extends React.Component<IdCardProps, {}> {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    shouldComponentUpdate(nextProps = {}, nextState = {}) {
        const thisProps = this.props || {}, thisState = this.state || {}
        if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
            Object.keys(thisState).length !== Object.keys(nextState).length) {
            return true
        }
        for (const key in nextProps) {
            if (!is(thisProps[key], nextProps[key])) {
                return true
            }
        }
        for (const key in nextState) {
            if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
                return true
            }
        }
        return false
    }

    render() {
        console.log('id-cord-render')
        const { name = '', weapons = '' } = this.props
        return (
            <div className={style.border}>
                <div>name:{name}</div>
                <div>weapons:{weapons}</div>
            </div>)
    }
}

interface IimmList {
    weapons: string
    name: string
}
interface IState {
    list: List<IimmList>
}

class PageA extends React.Component<{}, IState> {
    constructor(props) {
        super(props)
        this.state = {
            list: List([{
                name: 'Tony Stark',
                weapons: 'mk'
            }, {
                name: 'Steve Rogers',
                weapons: 'shield'
            }, {
                name: 'Thor',
                weapons: 'hammer'
            }, {
                name: 'Natasha Romanova',
                weapons: 'beautiful'
            }])
        }
    }
    public change = () => {
        const random = Math.round(Math.random() * 3)
        const list = this.state.list
        console.log(list)
        const newList = list.set(random, { name: 'Thanos', weapons: 'Infinite gloves' })
        this.setState({
            list: newList
        })
        console.log('change')
    }
    render() {
        const { list } = this.state
        return (
            <div>
                <h3>immutable scu</h3>
                <div>
                <Button type="primary" onClick={this.change}>change Data</Button>
                {
                    list.map(({ name, weapons }, key) => {
                        return <IdCard key={key} name={name} weapons={weapons} />
                    })
                }
            </div>

            <br/>
            <br/>
            <br/>
            <br/><hr/>
            <Immer/>
            </div>
            )
    }
}
export default PageA
