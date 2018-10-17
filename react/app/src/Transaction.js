
import React from 'react'

import {trunkId} from './Tools'

export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
	const className = "transaction"+((this.props.selected)?" selected":"")
    const content = trunkId(this.props.tx.id) + ": " + (this.props.tx.user) + ":" + (this.props.tx.x) + "/" + (this.props.tx.y)
    return <label onClick={this.props.handler} className={className}>{content}</label>
  }
}