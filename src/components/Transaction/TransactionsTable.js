import React, { PropTypes} from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import {
  CircularProgress,
  Table,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui'

import {
  formatTimestamp,
  convertToNXT
} from 'redux/utils/nrs'

export class TransactionsTable extends React.Component {
  render () {
    const {
      intl: { formatNumber, formatMessage },
      loading,
      transactions,
      accountRS
    } = this.props

    if (loading) {
      return <CircularProgress />
    }

    const tableStyle = {
      tableLayout: 'auto'
    }

    const tableBodyStyle = {
      overflowX: 'auto'
    }

    if (!loading && !transactions.length) {
      return <div><FormattedMessage id='no_transactions' /></div>
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
            <TableHeaderColumn><FormattedMessage id='type' /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id='account' /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id='amount' /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id='fee' /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id='date' /></TableHeaderColumn>
          </TableRow>
          {loading
          ? <TableRow>
            <TableRowColumn colSpan='4'>
              <CircularProgress />
            </TableRowColumn>
          </TableRow>
          : transactions.map((transaction) => {
            const amount = convertToNXT(transaction.amountNQT)
            const fee = convertToNXT(transaction.feeNQT)
            let type = 'received'
            let fromTo = 'from'
            let account = transaction.senderRS
            if (account === accountRS) {
              type = 'sent'
              fromTo = 'to'
              account = transaction.recipientRS
            }

            const style = {}
            if (!transaction.confirmations) {
              style.fontStyle = 'italic'
            }

            return <TableRow key={transaction.transaction}>
              <TableRowColumn>
                <span style={{ color: type === 'received' ? 'green' : 'red' }}>
                  <FormattedMessage id={type} /> {formatMessage({ id: fromTo }).toLowerCase()}
                </span>
              </TableRowColumn>
              <TableRowColumn>
                {account}
              </TableRowColumn>
              <TableRowColumn>
                {formatNumber(amount)} <FormattedMessage id='currency_name' />
              </TableRowColumn>
              <TableRowColumn>
                {formatNumber(fee)} <FormattedMessage id='currency_name' />
              </TableRowColumn>
              <TableRowColumn>
                {formatTimestamp(transaction.timestamp).toLocaleString()}
              </TableRowColumn>
            </TableRow>
          })}
        </TableBody>
      </Table>
    )
  }
}

TransactionsTable.propTypes = {
  intl: PropTypes.object.isRequired,
  accountRS: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired
}

export default injectIntl(TransactionsTable)
