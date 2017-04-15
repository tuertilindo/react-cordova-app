import React from 'react'
import Htmlloader from 'react-static-html'
export default class Help extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (<Htmlloader src="pages/ayuda.html">
      Iniciando la ayuda...
    </Htmlloader>)
  }

}
