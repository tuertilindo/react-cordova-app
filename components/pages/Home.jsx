import React from 'react'
import Umenu from '../user/Umenu.jsx'
import Appbar from 'muicss/lib/react/appbar'
export default class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="topmenu">
        <Appbar className="mui--z1">
          <Umenu />
        </Appbar>
        {this.props.children}
      </div>
    )
  }

}
