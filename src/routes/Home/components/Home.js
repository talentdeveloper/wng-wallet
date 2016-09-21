import React, { PropTypes } from 'react'
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

import PageTitle from 'components/PageTitle'
import SendFormContainer from 'components/SendFormContainer'
import ReceiveModal from 'components/ReceiveModal'
import TransactionModal from 'components/TransactionModal'
import TransactionsListContainer from 'components/Transaction/TransactionsListContainer'
import GetNewVersionModal from 'components/GetNewVersionModal'

export class Home extends React.Component {
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
        <TransactionModal show={showModal} title={modalTitle} form={<SendFormContainer />} />
        <GetNewVersionModal />
      </PageTitle>
    )
  }
}

Home.propTypes = {
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

export default Home
