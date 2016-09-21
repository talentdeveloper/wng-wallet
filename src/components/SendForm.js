import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import { reduxForm, Field, propTypes } from 'redux-form'
import { FlatButton, RaisedButton } from 'material-ui'
import { TextField } from 'redux-form-material-ui'

import NxtAddress from 'redux/utils/nxtAddress'

import formStyle from './Form.scss'

export class SendForm extends React.Component {
  handleSubmit = (data) => {
    const { sendMoney } = this.props
    sendMoney(data)
  }

  componentWillReceiveProps = (nextProps) => {
    const { getTransactions, isSending, sendSuccess } = nextProps

    if (this.props.isSending && !isSending && sendSuccess) {
      getTransactions()
    }
  }

  onNextStep = (step) => {
    const { setStep } = this.props
    setStep(1)
  }

  onPreviousStep = (step) => {
    const { setStep } = this.props
    setStep(0)
  }

  onHide = () => {
    const { hideModal } = this.props
    hideModal()
  }

  render () {
    const {
      intl: { formatMessage },
      handleSubmit,
      isSending,
      sendSuccess,
      sendError,
      sendStep,
      formValues,
      invalid
    } = this.props

    console.log(formValues)

    if (sendSuccess) {
      return <div>
        <p><FormattedMessage id='successfully_send' /></p>
        <div className={formStyle.actions}>
          <FlatButton
            onClick={this.onHide}
            label={formatMessage({ id: 'close' })} />
        </div>
      </div>
    }

    const disableButton = invalid || isSending

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        {sendStep === 0 && <div>
          <Field
            name='recipient'
            component={TextField}
            floatingLabelText={formatMessage({ id: 'recipient' })}
            fullWidth />
          <br />
          <Field
            name='amount'
            component={TextField}
            type='number'
            floatingLabelText={formatMessage({ id: 'amount' })}
            fullWidth />
          <br />
          <div className={formStyle.actions}>
            <FlatButton
              onClick={this.onHide}
              label={formatMessage({ id: 'cancel' })} />
            <RaisedButton
              onClick={this.onNextStep}
              primary
              label={formatMessage({ id: 'next' })}
              disabled={Boolean(disableButton)} />
          </div>
        </div>}
        {sendStep === 1 && <div>
          {sendError
          ? <p>{sendError}</p>
          : <p>
            <FormattedMessage
              id='confirm_send_money_amount'
              values={{ amount: formValues.amount }} />
            <br />
            <FormattedMessage
              id='confirm_send_money_account'
              values={{ recipient: formValues.recipient }} />
          </p>}
          <div className={formStyle.actions}>
            <FlatButton
              onClick={this.onPreviousStep}
              label={formatMessage({ id: 'previous' })} />
            {!sendError && <RaisedButton
              type='submit'
              primary
              label={formatMessage({ id: 'submit' })}
              disabled={Boolean(disableButton)} />}
          </div>
        </div>}
      </form>
    )
  }
}

SendForm.propTypes = {
  ...propTypes,
  intl: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  sendSuccess: PropTypes.bool.isRequired,
  sendError: PropTypes.string.isRequired,
  sendStep: PropTypes.number.isRequired
}

const validate = (values, state) => {
  const { formatMessage } = state.intl
  const errors = {}

  const requiredErrorText = formatMessage({ id: 'required_error' })
  const invalidAddressText = formatMessage({ id: 'invalid_address' })

  if (!values.recipient) {
    errors.recipient = requiredErrorText
  } else {
    const nxtAddress = new NxtAddress()
    if (!nxtAddress.set(values.recipient)) {
      errors.recipient = invalidAddressText
    }
  }

  if (!values.amount) {
    errors.amount = requiredErrorText
  }

  return errors
}

export default reduxForm({
  form: 'transaction',
  validate
})(SendForm)
