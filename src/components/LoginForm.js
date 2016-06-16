import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import {
  Checkbox,
  RaisedButton,
  TextField
} from 'material-ui'

import style from './LoginForm.scss'

import { login, toggleImportBackup, setBackupFile } from 'redux/modules/auth'

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
    data.isAdmin = this.props.isAdmin
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
      importBackup,
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
  handleSubmit: PropTypes.func.isRequired,
  toggleImportBackup: PropTypes.func.isRequired,
  setBackupFile: PropTypes.func.isRequired,
  importBackup: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool
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
  }, (state) => ({
    initialValues: {
      username: state.auth.username,
      email: state.auth.email
    },
    importBackup: state.auth.importBackup
  }), (dispatch) => ({
    toggleImportBackup: () => {
      dispatch(toggleImportBackup())
    },
    setBackupFile: (file) => {
      dispatch(setBackupFile(file))
    }
  }))(LoginForm)
)
