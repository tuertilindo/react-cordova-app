import 'whatwg-fetch'
const objectAssign = require('object-assign')
var Query = (options) => {
  var opt = objectAssign({
    method: 'GET',
    action: 'user',
    onComplete: null,
    data: null
  }, options)
  var status = 400
  var body = null
  var host = 'http://localhost/api/index.php/' + opt.action
  if (opt.data) {
    if (opt.token) {
      opt.data.token = opt.token
    }
    if (opt.method === 'GET') {
      var ext = '?'
      for (var key in opt.data) {
        ext = ext + key + '=' + opt.data[key] + '&'
      }
      host = host + ext
    } else if (opt.method === 'POST') {
      body = new FormData()
      for (var key1 in opt.data) {
        body.append(key1, opt.data[key1])
      }
    }
  }
  fetch(host, {
    method: opt.method,
    mode: 'cors',
    body: body,
    headers: opt.headers
  }).then((response) => {
    status = response.status
    return response.json()
  }).then((data) => {
    var done = null
    var error = null
    if (status === 200) {
      done = data
    } else {
      error = data
    }
    if (opt.onComplete instanceof Function) {
      opt.onComplete(done, error)
    }
  }).catch((ex) => {
    if (opt.onComplete instanceof Function) {
      opt.onComplete(null, ex)
    }
  })
}
export default Query
