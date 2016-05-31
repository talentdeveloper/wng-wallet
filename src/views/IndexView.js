import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexgrid'
import {
  Card,
  CardTitle,
  CardText,
  RaisedButton
} from 'material-ui'
import CopyToClipboard from 'react-copy-to-clipboard'

import { showModal } from 'redux/modules/transaction'

import PageTitle from 'components/PageTitle'
import SendForm from 'components/SendForm'
import TransactionModal from 'components/TransactionModal'
import TransactionsList from 'components/TransactionsList'

export class IndexView extends React.Component {
  constructor () {
    super()
    this.state = {
      copySuccess: false
    }
  }

  _onCopy = () => {
    this.setState({
      copySuccess: true
    })
  }

  _onSendClick = () => {
    const { onSendClick } = this.props

    onSendClick()
  }

  render () {
    const {
      intl: {
        formatMessage
      },
      accountRS,
      transactions,
      showModal,
      modalTitle
    } = this.props

    const { copySuccess } = this.state

    return (
      <PageTitle pageName='home'>
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardTitle
                title={formatMessage({ id: 'website_name' })}
                subtitle={formatMessage({ id: 'website_subtitle' })} />
              <CardText>
                <div>
                  <h4>
                    <FormattedMessage id='account_number' />
                    <small>&nbsp;<FormattedMessage id='click_to_copy_account' /></small>
                  </h4>
                  <CopyToClipboard text={accountRS} onCopy={this._onCopy}>
                    <RaisedButton
                      label={formatMessage({ id: 'receive_currency' })}
                      secondary />
                  </CopyToClipboard>
                  {copySuccess
                    ? <div style={{ color: 'green' }}>
                      <FormattedMessage id='copied_account' />
                    </div>
                    : null}
                </div>
                <RaisedButton
                  onClick={this._onSendClick}
                  label={formatMessage({ id: 'send_currency' })}
                  primary
                  style={{ marginTop: 8 }} />
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
                <TransactionsList accountRS={accountRS} transactions={transactions} />
              </CardText>
            </Card>
          </Col>
        </Row>
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
  onSendClick: PropTypes.func.isRequired
}

export default injectIntl(connect((state) => {
  const { accountRS } = state.auth.account
  const {
    transactions,
    showModal,
    modalTitle
  } = state.transaction

  return {
    accountRS,
    transactions,
    showModal,
    modalTitle
  }
}, (dispatch) => {
  return {
    onSendClick: () => {
      dispatch(showModal())
    }
  }
})(IndexView))
