import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import {
  Checkbox,
  RaisedButton
} from 'material-ui'
import {
  TextField
} from 'redux-form-material-ui'

import style from './LoginForm.scss'

export class LoginForm extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  _handleFile = (e) => {
    try {
      const { setBackupFile } = this.props
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = (e) => {
        const { result } = e.target
        try {
          const parsed = JSON.parse(result)
          setBackupFile(parsed)
        } catch (e) {}
      }

      reader.readAsText(file)
    } catch (e) {}
  }

  _onImportCheck = () => {
    const { toggleImportBackup } = this.props
    toggleImportBackup()
  }

  handleSubmit (data, dispatch) {
    const { isAdmin, login } = this.props
    data.isAdmin = isAdmin
    login(data)
  }

  render () {
    const {
      intl: {
        formatMessage
      },
      importBackup,
      handleSubmit,
      invalid
    } = this.props

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
        <br />
        <br />
        <Checkbox
          label={formatMessage({ id: 'import_backup' })}
          defaultChecked={importBackup}
          onCheck={this._onImportCheck} />
        <br />
        {importBackup && <input accept='application/json' type='file' onChange={this._handleFile} />}
        <div className={style.submitContainer}>
          <RaisedButton
            type='submit'
            primary
            label={formatMessage({ id: 'submit' })}
            disabled={invalid} />
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
  login: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleImportBackup: PropTypes.func.isRequired,
  setBackupFile: PropTypes.func.isRequired,
  importBackup: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool
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

  return errors
}

export default reduxForm({
  form: 'login',
  validate
})(LoginForm)
