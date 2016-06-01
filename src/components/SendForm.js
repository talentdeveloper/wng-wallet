import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { reduxForm } from 'redux-form'
import {
  FlatButton,
  RaisedButton,
  TextField
} from 'material-ui'

import {
  hideModal,
  setStep,
  sendMoney,
  getTransactions
} from 'redux/modules/transaction'

import formStyle from './Form.scss'

export class SendForm extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onHide = this.onHide.bind(this)
    this.onNextStep = this.onNextStep.bind(this)
    this.onPreviousStep = this.onPreviousStep.bind(this)
  }

  handleSubmit (data, dispatch) {
    dispatch(sendMoney(data))
  }

  componentWillReceiveProps (nextProps) {
    const { getTransactions, isSending, sendSuccess } = nextProps

    if (this.props.isSending && !isSending && sendSuccess) {
      getTransactions()
    }
  }

  onNextStep (step) {
    const { setStep } = this.props
    setStep(1)
  }

  onPreviousStep (step) {
    const { setStep } = this.props
    setStep(0)
  }

  onHide () {
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
      isSending,
      sendSuccess,
      sendError,
      sendStep
    } = this.props

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

    const error = (field) => {
      return field.touched && field.error ? formatMessage({ id: field.error }) : null
    }

    const disableButton = recipient.error || amount.error || isSending

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        {sendStep === 0 && <div>
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
              id='confirm_send_money'
              values={{ amount: amount.value, recipient: recipient.value }} />
          </p>}
          <div className={formStyle.actions}>
            <FlatButton
              onClick={this.onPreviousStep}
              label={formatMessage({ id: 'previous' })} />
            <RaisedButton
              type='submit'
              primary
              label={formatMessage({ id: 'submit' })}
              disabled={Boolean(disableButton)} />
          </div>
        </div>}
      </form>
    )
  }
}

SendForm.propTypes = {
  intl: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  sendSuccess: PropTypes.bool.isRequired,
  sendError: PropTypes.string.isRequired,
  sendStep: PropTypes.number.isRequired
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
    const {
      isSending,
      sendStep,
      sendSuccess,
      sendError
    } = state.transaction

    return {
      isSending,
      sendStep,
      sendSuccess,
      sendError
    }
  },

  (dispatch) => {
    return {
      hideModal: () => {
        dispatch(hideModal())
      },
      setStep: (step) => {
        dispatch(setStep(step))
      },
      getTransactions: () => {
        dispatch(getTransactions())
      }
    }
  })(SendForm)
)
