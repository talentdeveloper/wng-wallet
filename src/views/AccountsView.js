import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexgrid'

import PageTitle from 'components/PageTitle'
import AccountsTable from 'components/AccountsTable'
import TransactionModal from 'components/TransactionModal'
import SendForm from 'components/SendForm'

import {
  getAccounts,
  nextPage,
  previousPage
} from 'redux/modules/account'
import { showModal } from 'redux/modules/transaction'

export class AccountsView extends React.Component {
  componentDidMount () {
    const { getAccounts } = this.props

    getAccounts()
  }

  render () {
    const {
      showTransactionModal,
      transactionModalTitle
    } = this.props

    return (
      <PageTitle pageName='admin'>
        <Row>
          <Col md={12} style={{ width: '100%' }}>
            <AccountsTable {...this.props} />
          </Col>
        </Row>
        <TransactionModal
          show={showTransactionModal}
          title={transactionModalTitle}
          form={<SendForm />} />
      </PageTitle>
    )
  }
}

AccountsView.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  isRetrievingAccounts: PropTypes.bool.isRequired,
  disableNextButton: PropTypes.bool.isRequired,
  disablePreviousButton: PropTypes.bool.isRequired,
  showTransactionModal: PropTypes.bool.isRequired,
  transactionModalTitle: PropTypes.string.isRequired
}

export default injectIntl(connect((state) => {
  const {
    accounts,
    totalAccounts,
    isRetrievingAccounts,
    offset,
    limit
  } = state.account

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
    transactionModalTitle: modalTitle
  }
}, (dispatch) => ({
  getAccounts: () => {
    dispatch(getAccounts())
  },
  onNextClick: () => {
    dispatch(nextPage())
  },
  onPreviousClick: () => {
    dispatch(previousPage())
  },
  onAccountRSClick: (accountRS) => {
    dispatch(showModal({ recipient: accountRS }))
  }
}))(AccountsView))
