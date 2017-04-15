import Query from './Query.jsx'
export default class Request {
  constructor () {
    this.state = {}
  }
  setToken (userToken) {
    this.state.token = userToken
  }
  login (guser, callback) {
    Query({
      action: 'users/glogin',
      method: 'POST',
      data: {
        id_token: guser.id_token,
        huesos: 1
      },
      onComplete: (done, error) => {
        if (callback instanceof Function) {
          callback(done, error)
        }
      }
    })
  }
}
