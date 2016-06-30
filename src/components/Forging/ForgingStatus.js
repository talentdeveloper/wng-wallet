import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FlatButton } from 'material-ui'

class ForgingStatus extends React.Component {
  _onGetStatusClick = () => {
    const { getForging, node } = this.props
    getForging(node)
  }
  render () {
    const {
      intl: { formatMessage },
      status,
      node
    } = this.props

    const style = {}

    switch (status) {
      case 'unknown':
        style.color = 'gray'
        break
      case 'is_forging':
        style.color = 'green'
        break
      case 'not_forging':
        style.color = 'red'
        break
      default:
        style.color = 'gray'
    }

    const disableButton = !node

    return (
      <div>
        <strong><FormattedMessage id='forging_status' /></strong>
        <span style={style}>
          <FormattedMessage id={status} />
        </span>
        <FlatButton label={formatMessage({ id: 'get_forging_status' })}
          onTouchTap={this._onGetStatusClick}
          disabled={Boolean(disableButton)} />
      </div>
    )
  }
}

ForgingStatus.propTypes = {
  intl: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  node: PropTypes.string.isRequired,
  getForging: PropTypes.func.isRequired
}

export default injectIntl(ForgingStatus)
