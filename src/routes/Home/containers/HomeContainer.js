import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import { showModal } from 'redux/modules/transaction'
import { showReceiveModal, hideReceiveModal } from 'routes/Auth/modules/Auth'
import { convertToNXT } from 'redux/utils/nrs'

import Home from '../components/Home'

const mapActionCreators = (dispatch) => ({
  onSendClick: () => {
    dispatch(showModal())
  },
  onReceiveClick: () => {
    dispatch(showReceiveModal())
  },
  handleReceiveClose: () => {
    dispatch(hideReceiveModal())
  }
})

const mapStateToProps = (state) => {
  const {
    accountRS,
    publicKey
  } = state.auth.account
  const {
    showModal,
    modalTitle
  } = state.transaction

  const {
    showReceiveModal
  } = state.auth

  const balance = convertToNXT(state.auth.account.unconfirmedBalanceNQT)

  return {
    accountRS,
    balance,
    publicKey,
    showModal,
    showReceiveModal,
    modalTitle
  }
}
export default connect(
  mapStateToProps,
  mapActionCreators
)(injectIntl(Home))
