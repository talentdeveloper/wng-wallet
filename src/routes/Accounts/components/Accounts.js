import React, { PropTypes } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import {
  Card,
  CardTitle,
  CardText,
  TextField
} from 'material-ui'

import PageTitle from 'components/PageTitle'
import AccountsTable from './AccountsTable'
import TransactionModal from 'components/TransactionModal'
import SendFormContainer from 'components/SendFormContainer'

export class Accounts extends React.Component {
  constructor () {
    super()
    this.searching
  }

  componentDidMount = () => {
    const { getAccounts } = this.props
    console.log('didMount')
    console.log(getAccounts)
    getAccounts()
  }

  componentWillUnmount = () => {
    const { resetPagination } = this.props
    resetPagination()
  }

  _onSearch = (e) => {
    const { getAccounts, setSearch } = this.props
    const { value } = e.target

    console.log(getAccounts)
    console.log(setSearch)

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
        <TransactionModal
          show={showTransactionModal}
          title={transactionModalTitle}
          form={<SendFormContainer />} />
      </PageTitle>
    )
  }
}

Accounts.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  resetPagination: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  isRetrievingAccounts: PropTypes.bool.isRequired,
  disableNextButton: PropTypes.bool.isRequired,
  disablePreviousButton: PropTypes.bool.isRequired,
  showTransactionModal: PropTypes.bool.isRequired,
  transactionModalTitle: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired
}

export default Accounts
