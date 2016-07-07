import React, { PropTypes } from 'react'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { reduxForm } from 'redux-form'
import {
  RaisedButton,
  TextField
} from 'material-ui'

import {
  startForging,
  stopForging
} from 'redux/modules/forging'

import formStyle from 'components/Form.scss'

export class SendForm extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (data) {
    const { status, stopForging, startForging } = this.props
    if (status === 'is_forging') {
      return stopForging(data)
    }
    return startForging(data)
  }

  render () {
    const {
      intl: {
        formatMessage
      },
      fields: {
        node
      },
      handleSubmit,
      status,
      effectiveBalance,
      coinName
    } = this.props

    const error = (field) => {
      return field.touched && field.error ? formatMessage({ id: field.error }) : null
    }

    const disableButton = node.error || effectiveBalance < 2000
    const buttonText = status === 'is_forging'
      ? formatMessage({ id: 'stop_forging' })
      : formatMessage({ id: 'start_forging' })

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <TextField
          floatingLabelText={formatMessage({ id: 'node_url' })}
          errorText={error(node)}
          fullWidth
          {...node} />
        <br />
        <br />
        <div className={formStyle.actions}>
          <span style={{ float: 'left' }}>
            <FormattedMessage id='forging_balance' /> <FormattedNumber value={effectiveBalance} /> {coinName}
          </span>
          <RaisedButton
            type='submit'
            primary
            label={buttonText}
            disabled={Boolean(disableButton)} />
        </div>
      </form>
    )
  }
}

SendForm.propTypes = {
  intl: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  startForging: PropTypes.func.isRequired,
  stopForging: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  effectiveBalance: PropTypes.number.isRequired,
  coinName: PropTypes.string.isRequired
}

const validate = values => {
  const errors = {}

  if (!values.node) {
    errors.node = 'required_error'
  } else {
  }

  return errors
}

export default injectIntl(reduxForm({
  form: 'forging',
  fields: ['node'],
  validate
}, (state) => ({
  initialValues: {
    node: state.forging.defaultNode
  },
  status: state.forging.status,
  effectiveBalance: state.auth.account.effectiveBalance,
  coinName: state.site.coinName
}), (dispatch) => ({
  startForging: (data) => {
    dispatch(startForging(data))
  },
  stopForging: (data) => {
    dispatch(stopForging(data))
  }
}))(SendForm))
