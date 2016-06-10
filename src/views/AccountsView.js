import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexgrid'
import {
  Card,
  CardTitle,
  CardText,
  TextField
} from 'material-ui'

import PageTitle from 'components/PageTitle'
import AccountsTable from 'components/AccountsTable'
import TransactionModal from 'components/TransactionModal'
import SendForm from 'components/SendForm'

import {
  getAccounts,
  setSearch,
  nextPage,
  previousPage
} from 'redux/modules/account'
import { showModal } from 'redux/modules/transaction'

export class AccountsView extends React.Component {
  constructor () {
    super()
    this.searching
  }
  componentDidMount () {
    const { getAccounts } = this.props

    getAccounts()
  }

  _onSearch = (e) => {
    const { getAccounts, setSearch } = this.props
    const { value } = e.target

    clearTimeout(this.searching)
    this.searching = setTimeout(() => {
      setSearch(value)
      getAccounts()
    }, 500)
  }

  render () {
    const {
      intl: { formatMessage },
      showTransactionModal,
      transactionModalTitle,
      search
    } = this.props

    return (
      <PageTitle pageName='admin'>
        <Row>
          <Col md={12} style={{ width: '100%' }}>
            <Card>
              <CardTitle
                title={formatMessage({ id: 'accounts' })}
                subtitle={formatMessage({ id: 'accounts_subtitle' })} />
              <CardText>
                <Col xs={12} md={6}>
                  <TextField
                    defaultValue={search}
                    fullWidth
                    onChange={this._onSearch}
                    hintText={formatMessage({ id: 'search_help' })}
                    floatingLabelText={formatMessage({ id: 'search' })} />
                </Col>
                <AccountsTable {...this.props} />
              </CardText>
            </Card>
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
  setSearch: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  isRetrievingAccounts: PropTypes.bool.isRequired,
  disableNextButton: PropTypes.bool.isRequired,
  disablePreviousButton: PropTypes.bool.isRequired,
  showTransactionModal: PropTypes.bool.isRequired,
  transactionModalTitle: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired
}

export default injectIntl(connect((state) => {
  const {
    accounts,
    totalAccounts,
    isRetrievingAccounts,
    offset,
    limit,
    search
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
    transactionModalTitle: modalTitle,
    search
  }
}, (dispatch) => ({
  getAccounts: () => {
    dispatch(getAccounts())
  },
  setSearch: (search) => {
    dispatch(setSearch(search))
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
