import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import Login from '../components/Login'

const mapStateToProps = (state) => ({
  registerSuccess: state.auth.registerSuccess,
  loginError: state.auth.loginError,
  connectionError: state.site.connectionError
})

export default connect(
  mapStateToProps
)(injectIntl(Login))
