import * as React from 'react'
import { Button } from 'antd'

import * as style from './style.css'

class PageA extends React.Component {
    render() {
        return (
            <h1 className={style.red}>
                <Button type="primary" >PageA</Button>
            </h1>)
    }
}
export default PageA
