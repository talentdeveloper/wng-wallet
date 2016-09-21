import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'

import {
  getAccounts,
  setSearch,
  nextPage,
  previousPage,
  resetPagination
} from '../modules/Accounts'
import { showModal } from 'redux/modules/transaction'

import Accounts from '../components/Accounts'

const mapActionCreators = (dispatch) => ({
  ...bindActionCreators({
    getAccounts,
    setSearch,
    onNextClick: nextPage,
    onPreviousClick: previousPage,
    resetPagination
  }, dispatch),
  onAccountRSClick: (accountRS) => {
    dispatch(showModal({ recipient: accountRS }))
  }
})

const mapStateToProps = (state) => {
  const {
    accounts,
    totalAccounts,
    isRetrievingAccounts,
    offset,
    limit,
    search
  } = state.accounts

  const {
    showModal,
    modalTitle
  } = state.transaction

  const disableNextButton = limit + offset >= totalAccounts
  const disablePreviousButton = offset <= 0

  return {
    accounts,
    isRetrievingAccounts,
    disableNextButton,
    disablePreviousButton,
    showTransactionModal: showModal,
    transactionModalTitle: modalTitle,
    search
  }
}

export default connect(
  mapStateToProps,
  mapActionCreators
)(injectIntl(Accounts))
