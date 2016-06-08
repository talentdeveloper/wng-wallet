import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexgrid'

import PageTitle from 'components/PageTitle'

import { getAccounts } from 'redux/modules/account'

export class AccountsView extends React.Component {
  componentDidMount () {
    const { getAccounts } = this.props

    getAccounts()
  }
  render () {
    const {
      accounts
    } = this.props

    return (
      <PageTitle pageName='admin'>
        <Row>
          <Col md={12}>
            {accounts.map((account) => {
              return <div>
                {account.username}
              </div>
            })}
          </Col>
        </Row>
      </PageTitle>
    )
  }
}

AccountsView.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  isRetrievingAccounts: PropTypes.bool.isRequired
}

export default injectIntl(connect((state) => {
  const {
    accounts,
    isRetrievingAccounts
  } = state.account

  return {
    accounts,
    isRetrievingAccounts
  }
}, (dispatch) => ({
  getAccounts: () => {
    dispatch(getAccounts())
  }
}))(AccountsView))
