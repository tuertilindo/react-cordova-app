import React from 'react'
import Reflux from 'reflux'
import Dropdown from 'muicss/lib/react/dropdown'
import DropdownItem from 'muicss/lib/react/dropdown-item'
import Divider from 'muicss/lib/react/divider'
import Ustore from './Ustore.jsx'
import Uactions from './Uactions.jsx'
import Boton from 'react-mc-controls/controls/Boton.jsx'
export default class Umenu extends Reflux.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'Iniciar sesión',
      image: 'images/M.svg',
      status: 'OFFLINE'
    }
    this.mapStoreToState(Ustore, (fromStore) => {
      var obj = {
        status: fromStore.status
      }
      return obj
    })
  }
  render () {
    return (<Dropdown opened={this.state.openMenu} color="primary" label={<img src="images/menu.png" />}>
      <DropdownItem onClick={() => { Uactions.GoHome() }}><Boton image="images/home-i.png" span="Inicio" /></DropdownItem>
      <DropdownItem onClick={() => { Uactions.GoProfile() }}><Boton image="images/profile-i.png" span="Mi Perfil" /></DropdownItem>
      <Divider />
      <DropdownItem onClick={() => { Uactions.GoHelp() }}><Boton image="images/help-i.png" span="Ayuda" /></DropdownItem>
    </Dropdown>)
  }

}
