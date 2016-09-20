import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'
import {
  Card,
  CardTitle,
  CardText,
  FlatButton,
  RaisedButton
} from 'material-ui'
import InputIcon from 'material-ui/svg-icons/file/file-download'
import OutputIcon from 'material-ui/svg-icons/file/file-upload'

import { showModal } from 'redux/modules/transaction'
import { showReceiveModal, hideReceiveModal } from 'routes/Auth/modules/Auth'
import { convertToNXT } from 'redux/utils/nrs'

import PageTitle from 'components/PageTitle'
import SendForm from 'components/SendForm'
import ReceiveModal from 'components/ReceiveModal'
import TransactionModal from 'components/TransactionModal'
import TransactionsListContainer from 'components/Transaction/TransactionsListContainer'
import GetNewVersionModal from 'components/GetNewVersionModal'

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
      intl: { formatMessage, formatNumber },
      balance,
      accountRS,
      publicKey,
      showModal,
      showReceiveModal,
      handleReceiveClose,
      modalTitle
    } = this.props

    const buttonStyle = { margin: 10, height: 45 }

    return (
      <PageTitle pageName='home'>
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardTitle
                title={<div>
                  {formatMessage({ id: 'website_name' })}
                  <FlatButton
                    label={`
                      ${formatMessage({ id: 'balance' })}:
                      ${formatNumber(balance)} ${formatMessage({ id: 'currency_name' })}
                    `}
                    style={{ float: 'right', cursor: 'default' }} />
                </div>}
                subtitle={formatMessage({ id: 'website_subtitle' })} />
              <CardText>
                <RaisedButton
                  onClick={this._onReceiveClick}
                  icon={<InputIcon />}
                  label={formatMessage({ id: 'receive_currency' })}
                  primary
                  style={buttonStyle} />
                <RaisedButton
                  onClick={this._onSendClick}
                  icon={<OutputIcon />}
                  label={formatMessage({ id: 'send_currency' })}
                  secondary
                  labelStyle={{ }}
                  style={buttonStyle} />
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col xs={12} md={12}>
            <TransactionsListContainer />
          </Col>
        </Row>
        <ReceiveModal
          show={showReceiveModal}
          handleClose={handleReceiveClose}
          accountRS={accountRS}
          publicKey={publicKey} />
        <TransactionModal show={showModal} title={modalTitle} form={<SendForm />} />
        <GetNewVersionModal />
      </PageTitle>
    )
  }
}

IndexView.propTypes = {
  intl: PropTypes.object.isRequired,
  accountRS: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  publicKey: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  showReceiveModal: PropTypes.bool.isRequired,
  onSendClick: PropTypes.func.isRequired,
  onReceiveClick: PropTypes.func.isRequired,
  handleReceiveClose: PropTypes.func.isRequired
}

export default injectIntl(connect((state) => {
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
