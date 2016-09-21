import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { getFormValues } from 'redux-form'
import {
  hideModal,
  setStep,
  sendMoney,
  getTransactions
} from 'redux/modules/transaction'

import SendForm from './SendForm'

const mapActionCreators = {
  hideModal,
  setStep,
  sendMoney,
  getTransactions
}

const mapStateToProps = (state) => ({
  isSending: state.transaction.isSending,
  sendStep: state.transaction.sendStep,
  sendSuccess: state.transaction.sendSuccess,
  sendError: state.transaction.sendError,
  formValues: getFormValues('transaction')(state),
  initialValues: {
    recipient: state.transaction.recipient
  }
})

export default connect(
  mapStateToProps,
  mapActionCreators
)(injectIntl(SendForm))
