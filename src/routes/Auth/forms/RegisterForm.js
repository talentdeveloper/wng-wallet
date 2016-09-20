import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import { RaisedButton, TextField, LinearProgress } from 'material-ui'

import style from './RegisterForm.scss'

import { register, setPasswordStrength } from '../modules/Auth'

export class RegisterForm extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.3.0/zxcvbn.js'
    script.async = true

    document.body.appendChild(script)
  }

  componentWillReceiveProps = (nextProps) => {
    try {
      const { setPasswordStrength } = this.props
      const { value } = nextProps.fields.password
      setPasswordStrength(zxcvbn(value).score) // eslint-disable-line
    } catch (e) {}
  }

  handleSubmit (data, dispatch) {
    dispatch(register(data))
  }

  render () {
    const {
      intl: {
        formatMessage
      },
      fields: {
        username,
        email,
        password,
        confirmPassword
      },
      handleSubmit,
      passwordStrength
    } = this.props

    const error = (field) => {
      return field.touched && field.error ? formatMessage({ id: field.error }) : null
    }

    const hasError = username.error || email.error || password.error

    const getPasswordStrengthColor = (strength) => {
      switch (strength) {
        case 0:
          return 'red'
        case 1:
          return 'orange'
        case 2:
        case 3:
        case 4:
        default:
          return 'green'
      }
    }

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <TextField
          hintText={formatMessage({ id: 'username' })}
          floatingLabelText={formatMessage({ id: 'username' })}
          errorText={error(username)}
          fullWidth
          {...username} />
        <br />
        <TextField
          hintText={formatMessage({ id: 'email' })}
          floatingLabelText={formatMessage({ id: 'email' })}
          errorText={error(email)}
          fullWidth
          {...email} />
        <br />
        <TextField
          type='password'
          hintText={formatMessage({ id: 'password' })}
          floatingLabelText={formatMessage({ id: 'password' })}
          errorText={error(password)}
          fullWidth
          onChange={this._onPasswordChange}
          {...password} />
        <LinearProgress
          mode='determinate'
          value={Number(passwordStrength * 25)}
          color={getPasswordStrengthColor(passwordStrength)} />
        <small>
          <FormattedMessage id='strength' />
          <FormattedMessage id={`password_strength_${passwordStrength}`} />
        </small>
        <br />
        <TextField
          type='password'
          hintText={formatMessage({ id: 'confirm_password' })}
          floatingLabelText={formatMessage({ id: 'confirm_password' })}
          errorText={error(confirmPassword)}
          fullWidth
          {...confirmPassword} />
        <br />
        <div className={style.submitContainer}>
          <RaisedButton
            type='submit'
            primary
            label={formatMessage({ id: 'submit' })}
            disabled={Boolean(hasError)} />
          <Link to='login' className={style.loginButton}>
            {formatMessage({ id: 'login' })}
          </Link>
        </div>
      </form>
    )
  }
}

RegisterForm.propTypes = {
  intl: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setPasswordStrength: PropTypes.func.isRequired,
  passwordStrength: PropTypes.number.isRequired
}

const validate = values => {
  const errors = {}

  if (!values.username) {
    errors.username = 'required_error'
  }

  if (!values.email) {
    errors.email = 'required_error'
  }

  if (!values.password) {
    errors.password = 'required_error'
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'passwords_should_equal'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'required_error'
  }

  return errors
}

export default injectIntl(
  reduxForm({
    form: 'login',
    fields: ['username', 'email', 'password', 'confirmPassword'],
    validate
  }, (state) => ({
    passwordStrength: state.auth.passwordStrength
  }), (dispatch) => ({
    setPasswordStrength: (strength) => {
      dispatch(setPasswordStrength(strength))
    }
  }))(RegisterForm)
)
