import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexgrid'
import {
  Card,
  CardTitle,
  CardText,
  RaisedButton
} from 'material-ui'
import InputIcon from 'material-ui/svg-icons/file/file-download'
import OutputIcon from 'material-ui/svg-icons/file/file-upload'

import { showModal } from 'redux/modules/transaction'
import { showReceiveModal, hideReceiveModal } from 'redux/modules/auth'

import PageTitle from 'components/PageTitle'
import SendForm from 'components/SendForm'
import ReceiveModal from 'components/ReceiveModal'
import TransactionModal from 'components/TransactionModal'
import TransactionsList from 'components/TransactionsList'

export class IndexView extends React.Component {
  _onSendClick = () => {
    const { onSendClick } = this.props

    onSendClick()
  }

  _onReceiveClick = () => {
    const { onReceiveClick } = this.props

    onReceiveClick()
  }

  render () {
    const {
      intl: {
        formatMessage
      },
      accountRS,
      transactions,
      isRetrievingTransactions,
      showModal,
      showReceiveModal,
      handleReceiveClose,
      modalTitle
    } = this.props

    return (
      <PageTitle pageName='home'>
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardTitle
                title={formatMessage({ id: 'website_name' })}
                subtitle={formatMessage({ id: 'website_subtitle' })} />
              <CardText>
                <RaisedButton
                  onClick={this._onReceiveClick}
                  icon={<InputIcon />}
                  label={formatMessage({ id: 'receive_currency' })}
                  primary
                  style={{ margin: 10, height: 45 }} />
                <RaisedButton
                  onClick={this._onSendClick}
                  icon={<OutputIcon />}
                  label={formatMessage({ id: 'send_currency' })}
                  secondary
                  labelStyle={{ }}
                  style={{ margin: 10, height: 45 }} />
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col xs={12} md={12}>
            <Card>
              <CardTitle
                title={formatMessage({ id: 'transactions' })}
                subtitle={formatMessage({ id: 'latest_transactions' })} />
              <CardText>
                <TransactionsList
                  loading={isRetrievingTransactions}
                  accountRS={accountRS}
                  transactions={transactions} />
              </CardText>
            </Card>
          </Col>
        </Row>
        <ReceiveModal show={showReceiveModal} handleClose={handleReceiveClose} accountRS={accountRS} />
        <TransactionModal show={showModal} title={modalTitle} form={<SendForm />} />
      </PageTitle>
    )
  }
}

IndexView.propTypes = {
  intl: PropTypes.object.isRequired,
  accountRS: PropTypes.string.isRequired,
  transactions: PropTypes.array.isRequired,
  modalTitle: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  showReceiveModal: PropTypes.bool.isRequired,
  isRetrievingTransactions: PropTypes.bool.isRequired,
  onSendClick: PropTypes.func.isRequired,
  onReceiveClick: PropTypes.func.isRequired,
  handleReceiveClose: PropTypes.func.isRequired
}

export default injectIntl(connect((state) => {
  const { accountRS } = state.auth.account
  const {
    transactions,
    showModal,
    modalTitle,
    isRetrievingTransactions
  } = state.transaction

  const {
    showReceiveModal
  } = state.auth

  return {
    accountRS,
    transactions,
    showModal,
    showReceiveModal,
    modalTitle,
    isRetrievingTransactions
  }
}, (dispatch) => {
  return {
    onSendClick: () => {
      dispatch(showModal())
    },
    onReceiveClick: () => {
      dispatch(showReceiveModal())
    },
    handleReceiveClose: () => {
      dispatch(hideReceiveModal())
    }
  }
})(IndexView))
