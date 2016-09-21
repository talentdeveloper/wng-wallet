export default (store) => ({
  path: 'forging',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Forging = require('./containers/ForgingContainer').default
      cb(null, Forging)
    }, 'forging')
  }
})
