import Reflux from 'Reflux'
import Uactions from './Uactions.jsx'
import {hashHistory} from 'react-router'
import Glogin from 'react-mc-google'
import Request from '../queries/Request.jsx'
import isMobile from '../queries/Mobilecheck.jsx'
import ObjectAssign from 'object-assign'
export default class Ustore extends Reflux.Store {

  constructor () {
    super()
    this.state = {
      status: 'OFFLINE',
      user: null,
      cards: []
    }
    this.listenables = Uactions
    this.q = new Request()

    // esperamos el inicio e intentamos loguear
    if (isMobile()) {
      document.addEventListener('deviceready', () => {
        document.addEventListener('menubutton', () => { this.setState({openMenu: true}) }, true)
        this.LoginWithGoogle(true)
      }, false)
    } else {
      this.gl = new Glogin({
        'apiKey': 'AIzaSyBmFn5zPy7Bo354Ja9mJVMdwqd0HGQ9h80',
        // clientId and scope are optional if auth is not required.
        'clientId': '417176926357-n1i0r5c0lrsfk2uqeeb9jpqicmle4lh0.apps.googleusercontent.com',
        'scope': 'profile'
      })
      this.gl.onLogin((guser) => {
        this.LoginWithMascocitas(guser)
      })
    }
  }
  UpdateUser (user) {
    user.status = 'ONLINE'
    window.mcuser = ObjectAssign(this.state, user)
    // Unicamente actualiza los parametros
    this.setState(user)
  }
  LoginWithMascocitas (guser) {
    this.q.login(guser, (user, error) => {
      if (user) {
        this.q.setToken(user.token)
        this.UpdateUser(ObjectAssign({first_name: guser.name}, guser, user))
      } else if (error) {
        console.log(error)
      }
    })
  }
  LoginWithGoogle (silent) {
    if (this.state.status === 'CONNECTING') {
      return false
    }
    if (this.state.status === 'ONLINE') {
      this.GoProfile()
      return false
    }
    if (!window.plugins) {
      return false
    }
    this.setState({status: 'CONNECTING'})
    if (silent) {
      window.plugins.googleplus.trySilentLogin(
        {},
        (guser) => {
          this.LoginWithMascocitas(guser)
        },
        (msg) => {
          this.setState({status: 'OFFLINE'})
        })
    }
    window.plugins.googleplus.login(
        {},
        (guser) => {
          this.LoginWithMascocitas(guser)
        },
        (msg) => {
          this.setState({status: 'OFFLINE'})
        })
  }
  LogIn () {
    if (isMobile()) {
      this.LoginWithGoogle()
    } else {
      this.gl.callLogin()
    }
  }
  LogOut () {
    this.setState({status: 'DISCONNECTING'})
    window.plugins.googleplus.logout(
      (msg) => {
        this.setState({status: 'OFFLINE'})
      },
      (msg) => {
        this.setState({status: 'OFFLINE'})
      }
    )
  }
  atHome () {
    return window.location.hash === '#/'
  }
  GoHome () {
    if (!this.atHome())hashHistory.replace('/')
  }
  atProfile () {
    return window.location.hash === '#/profile'
  }
  GoProfile () {
    if (!this.atProfile())hashHistory.push('/profile')
  }
  atHelp () {
    return window.location.hash === '#/help'
  }
  GoHelp () {
    if (!this.atHelp())hashHistory.push('/help')
  }
}
