import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import Register from '../components/Register'

const mapStateToProps = (state) => ({
  registerError: state.auth.registerError
})

export default connect(
  mapStateToProps
)(injectIntl(Register))
