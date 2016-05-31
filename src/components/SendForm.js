import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { reduxForm } from 'redux-form'
import {
  FlatButton,
  RaisedButton,
  TextField
} from 'material-ui'

import { hideModal, sendMoney } from 'redux/modules/transaction'

import formStyle from './Form.scss'

export class SendForm extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  handleSubmit (data, dispatch) {
    dispatch(sendMoney(data))
  }

  onCancel () {
    const { hideModal } = this.props
    hideModal()
  }

  render () {
    const {
      intl: {
        formatMessage
      },
      fields: {
        recipient,
        amount
      },
      handleSubmit,
      isSending
    } = this.props

    const error = (field) => {
      return field.touched && field.error ? formatMessage({ id: field.error }) : null
    }

    const disableButton = recipient.error || amount.error || isSending

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <TextField
          hintText={formatMessage({ id: 'recipient' })}
          floatingLabelText={formatMessage({ id: 'recipient' })}
          errorText={error(recipient)}
          fullWidth
          {...recipient} />
        <br />
        <TextField
          hintText={formatMessage({ id: 'amount' })}
          floatingLabelText={formatMessage({ id: 'amount' })}
          errorText={error(amount)}
          fullWidth
          {...amount} />
        <br />
        <div className={formStyle.actions}>
          <FlatButton
            onClick={this.onCancel}
            label={formatMessage({ id: 'cancel' })} />
          <RaisedButton
            type='submit'
            primary
            label={formatMessage({ id: 'submit' })}
            disabled={Boolean(disableButton)} />
        </div>
      </form>
    )
  }
}

SendForm.propTypes = {
  intl: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired
}

const validate = values => {
  const errors = {}

  if (!values.recipient) {
    errors.recipient = 'required_error'
  }

  if (!values.amount) {
    errors.amount = 'required_error'
  }

  return errors
}

export default injectIntl(
  reduxForm({
    form: 'transaction',
    fields: ['recipient', 'amount'],
    validate
  },

  (state) => {
    const { isSending } = state.transaction

    return {
      isSending
    }
  },

  (dispatch) => {
    return {
      hideModal: () => {
        dispatch(hideModal())
      }
    }
  })(SendForm)
)
