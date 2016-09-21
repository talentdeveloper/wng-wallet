import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { register, setPasswordStrength } from '../modules/Auth'

import RegisterForm from '../forms/RegisterForm'

const mapActionCreators = {
  register,
  setPasswordStrength
}

const mapStateToProps = (state) => ({
  passwordStrength: state.auth.passwordStrength
})

export default connect(
  mapStateToProps,
  mapActionCreators
)(injectIntl(RegisterForm))
