import React from 'react'
import { reduxForm } from 'redux-form'

export class RegisterForm extends React.Component {
  render () {
    return (
      <form>
      </form>
    )
  }
}

export default reduxForm({
  form: 'login',
  fields: ['username', 'email', 'password']
})(RegisterForm)
