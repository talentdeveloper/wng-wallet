export default (store) => ({
  childRoutes: [{
    path: 'login',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Login = require('./containers/LoginContainer').default
        cb(null, Login)
      }, 'login')
    }
  }, {
    path: 'admin',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Login = require('./containers/LoginContainer').default
        cb(null, Login)
      }, 'admin')
    }
  }, {
    path: 'register',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Register = require('./containers/RegisterContainer').default
        cb(null, Register)
      }, 'register')
    }
  }]
})
