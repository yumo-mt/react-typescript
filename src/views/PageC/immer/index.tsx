import { produce } from "immer";
import React from 'react';


class ImmerComponent extends React.Component<any, any>{
  shouldComponentUpdate = (nextProps, nextState) => {

  }

  constructor(props) {
    super(props);
    this.state = {
      list: {
        status: '青铜'
      }
    }
  }
}


export default ImmerComponent;
