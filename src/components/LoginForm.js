import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import { RaisedButton, TextField } from 'material-ui'

import style from './LoginForm.scss'

import { login } from 'redux/modules/auth'

export class LoginForm extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (data, dispatch) {
    dispatch(login(data))
  }

  render () {
    const {
      intl: {
        formatMessage
      },
      fields: {
        username,
        email,
        password
      },
      handleSubmit
    } = this.props

    const error = (field) => {
      return field.touched && field.error ? formatMessage({ id: field.error }) : null
    }

    const hasError = username.error || email.error || password.error

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
          {...password} />
        <br />
        <div className={style.submitContainer}>
          <RaisedButton
            type='submit'
            primary
            label={formatMessage({ id: 'submit' })}
            disabled={Boolean(hasError)} />
          <Link to='register' className={style.registerButton}>
            {formatMessage({ id: 'register' })}
          </Link>
        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  intl: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
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

  return errors
}

export default injectIntl(
  reduxForm({
    form: 'login',
    fields: ['username', 'email', 'password'],
    validate
  })(LoginForm)
)
