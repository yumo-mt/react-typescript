import * as React from 'react'
import { Button } from 'antd'
import * as moment from 'moment'

import * as style from './style.css'

import * as style2 from './index.scss'

import JsDemo from './JS'

type item = {
    id: number;
    name: string;
    onChange(): void;
}

interface IProps {
    list: item[],
}

class List extends React.Component<IProps, object> {

    render() {
        const { list } = this.props
        console.log(list)
        return (
            list.map((i, idx) => {
                return (
                    <React.Fragment key={idx}>
                        <div key={idx}>{i.id}</div>
                        <Button type="primary" onClick={i.onChange}>{i.name}</Button>
                    </React.Fragment>
                )
            })
        )

    }
}

class PageA extends React.Component {
    change = () => {
        console.log('change')
    }
    render() {
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
        return (
            <h1 className={style.red}>
                <Button type="primary" >PageA</Button>
                <div className={style2.green}>green</div>
                <List list={[{ id: 123, name: 'manster', onChange: this.change }, { id: 456, name: 'Alex', onChange: this.change }]} />
                <JsDemo look="lookProps"/>
            </h1>)
    }
}
export default PageA
