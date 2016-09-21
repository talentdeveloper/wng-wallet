import React, { PropTypes } from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { reduxForm, Field, propTypes } from 'redux-form'
import { Row, Col } from 'react-flexbox-grid'
import { RaisedButton } from 'material-ui'
import { TextField } from 'redux-form-material-ui'

import ForgerNodeMenu from '../components/ForgerNodeMenu'

import formStyle from 'components/Form.scss'

export class ForgingForm extends React.Component {
  handleSubmit = (data) => {
    const { status, stopForging, startForging } = this.props
    if (status === 'is_forging') {
      return stopForging(data)
    }
    return startForging(data)
  }

  render () {
    const {
      intl: { formatMessage },
      handleSubmit,
      setForgerNode,
      nodes,
      status,
      effectiveBalance,
      coinName,
      defaultNode,
      formValues,
      invalid
    } = this.props

    const disableButton = invalid || effectiveBalance < 2000
    const buttonText = status === 'is_forging'
      ? formatMessage({ id: 'stop_forging' })
      : formatMessage({ id: 'start_forging' })

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Row>
          <Col xs={12} md={6}>
            <ForgerNodeMenu
              onChange={setForgerNode}
              selectedNode={formValues ? formValues.node : defaultNode}
              nodes={nodes} />
          </Col>
          <Col xs={12} md={6}>
            <Field
              name='node'
              component={TextField}
              floatingLabelText={formatMessage({ id: 'manual_forging_node' })}
              fullWidth />
          </Col>
        </Row>
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

ForgingForm.propTypes = {
  ...propTypes,
  intl: PropTypes.object.isRequired,
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  startForging: PropTypes.func.isRequired,
  stopForging: PropTypes.func.isRequired,
  setForgerNode: PropTypes.func.isRequired,
  nodes: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  effectiveBalance: PropTypes.number.isRequired,
  coinName: PropTypes.string.isRequired
}

const validate = (values, state) => {
  const { formatMessage } = state.intl
  const errors = {}

  if (!values.node) {
    errors.node = formatMessage({ id: 'required_error' })
  }

  return errors
}

export default reduxForm({
  form: 'forging',
  validate
})(ForgingForm)
