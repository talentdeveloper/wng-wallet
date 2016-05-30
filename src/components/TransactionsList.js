import React, { PropTypes} from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import {
  List,
  ListItem
} from 'material-ui'

import {
  formatTimestamp,
  convertToNXT
} from 'redux/utils/nrs'

import style from './TransactionsList.scss'

export class TransactionsList extends React.Component {
  render () {
    const {
      intl: { formatNumber },
      accountRS,
      transactions
    } = this.props

    const item = (type, fromTo, account, amount) => {
      return <div className={style.item}>
        <span className={type === 'received' ? style.received : style.sent}>{type}</span>
        <span className='hidden-xs hidden-sm'>{fromTo}</span>
        <span className='hidden-xs hidden-sm'>{account}</span>
        <span style={{ float: 'right' }}>{amount}</span>
      </div>
    }

    return (
      <List>
        {transactions.map((transaction) => {
          const amount = formatNumber(convertToNXT(transaction.amountNQT))
          let type = 'received'
          let fromTo = 'from'
          let account = transaction.senderRS
          if (account === accountRS) {
            type = 'sent'
            fromTo = 'to'
            account = transaction.recipientRS
          }

          return <ListItem
            key={transaction.transaction}
            primaryText={item(type, fromTo, account, amount)}
            secondaryText={<div>
              {formatTimestamp(transaction.timestamp).toLocaleString()}
            </div>}
            secondaryTextLines={2} />
        })}
      </List>
    )
  }
}

TransactionsList.propTypes = {
  intl: PropTypes.object.isRequired,
  accountRS: PropTypes.string.isRequired,
  transactions: PropTypes.array.isRequired
}

export default injectIntl(TransactionsList)
