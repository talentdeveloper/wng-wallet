import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { reduxForm, Field, propTypes } from 'redux-form'
import { RaisedButton, LinearProgress } from 'material-ui'
import { TextField } from 'redux-form-material-ui'

import style from './RegisterForm.scss'

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

  handleSubmit (data) {
    const { register } = this.props
    register(data)
  }

  render () {
    const {
      intl: { formatMessage },
      handleSubmit,
      passwordStrength,
      invalid
    } = this.props

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
        <Field
          name='username'
          component={TextField}
          hintText={formatMessage({ id: 'username' })}
          floatingLabelText={formatMessage({ id: 'username' })}
          fullWidth />
        <br />
        <Field
          name='email'
          component={TextField}
          hintText={formatMessage({ id: 'email' })}
          floatingLabelText={formatMessage({ id: 'email' })}
          fullWidth />
        <br />
        <Field
          name='password'
          component={TextField}
          type='password'
          hintText={formatMessage({ id: 'password' })}
          floatingLabelText={formatMessage({ id: 'password' })}
          fullWidth />
        <LinearProgress
          mode='determinate'
          value={Number(passwordStrength * 25)}
          color={getPasswordStrengthColor(passwordStrength)} />
        <small>
          <FormattedMessage id='strength' />
          <FormattedMessage id={`password_strength_${passwordStrength}`} />
        </small>
        <br />
        <Field
          name='confirmPassword'
          component={TextField}
          type='password'
          hintText={formatMessage({ id: 'confirm_password' })}
          floatingLabelText={formatMessage({ id: 'confirm_password' })}
          fullWidth />
        <br />
        <div className={style.submitContainer}>
          <RaisedButton
            type='submit'
            primary
            label={formatMessage({ id: 'submit' })}
            disabled={invalid} />
          <Link to='login' className={style.loginButton}>
            {formatMessage({ id: 'login' })}
          </Link>
        </div>
      </form>
    )
  }
}

RegisterForm.propTypes = {
  ...propTypes,
  intl: PropTypes.object.isRequired,
  setPasswordStrength: PropTypes.func.isRequired,
  passwordStrength: PropTypes.number.isRequired
}

const validate = (values, state) => {
  const { formatMessage } = state.intl
  const errors = {}

  const requiredErrorText = formatMessage({ id: 'required_error' })

  if (!values.username) {
    errors.username = requiredErrorText
  }

  if (!values.email) {
    errors.email = requiredErrorText
  }

  if (!values.password) {
    errors.password = requiredErrorText
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = formatMessage({ id: 'passwords_should_equal' })
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = requiredErrorText
  }

  return errors
}

export default reduxForm({
  form: 'login',
  validate
})(RegisterForm)
