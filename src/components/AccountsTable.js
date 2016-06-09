import React, { PropTypes} from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import {
  CircularProgress,
  FlatButton,
  Table,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui'

export class AccountsTable extends React.Component {
  _onPreviousClick = () => {
    const { onPreviousClick } = this.props
    onPreviousClick()
  }

  _onNextClick = () => {
    const { onNextClick } = this.props
    onNextClick()
  }

  render () {
    const {
      intl: { formatMessage },
      isRetrievingAccounts,
      accounts,
      disableNextButton,
      disablePreviousButton
    } = this.props

    if (isRetrievingAccounts) {
      return <CircularProgress />
    }

    const tableStyle = {
      tableLayout: 'auto'
    }

    const tableBodyStyle = {
      overflowX: 'scroll'
    }

    return (
      <Table
        selectable={false}
        fixedHeader={false}
        fixedFooter={false}
        bodyStyle={tableBodyStyle}
        style={tableStyle}>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableHeaderColumn><FormattedMessage id='number' /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id='username' /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id='email' /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id='account_number' /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id='creation_date' /></TableHeaderColumn>
          </TableRow>
          {isRetrievingAccounts
          ? <TableRow>
            <TableRowColumn colSpan='4'>
              <CircularProgress />
            </TableRowColumn>
          </TableRow>
          : accounts.map((account) => {
            return <TableRow key={account.id}>
              <TableRowColumn>
                {account.id}
              </TableRowColumn>
              <TableRowColumn>
                {account.username}
              </TableRowColumn>
              <TableRowColumn>
                {account.email}
              </TableRowColumn>
              <TableRowColumn>
                {account.accountRS}
              </TableRowColumn>
              <TableRowColumn>
                {new Date(account.createdAt).toLocaleString()}
              </TableRowColumn>
            </TableRow>
          })}
          <TableRow>
            <TableRowColumn colSpan='4'>
              <FlatButton
                onTouchTap={this._onPreviousClick}
                label={formatMessage({ id: 'previous' })}
                disabled={disablePreviousButton} />
              <FlatButton
                onTouchTap={this._onNextClick}
                label={formatMessage({ id: 'next' })}
                disabled={disableNextButton} />
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

AccountsTable.propTypes = {
  intl: PropTypes.object.isRequired,
  isRetrievingAccounts: PropTypes.bool.isRequired,
  accounts: PropTypes.array.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  disableNextButton: PropTypes.bool.isRequired,
  disablePreviousButton: PropTypes.bool.isRequired
}

export default injectIntl(AccountsTable)
