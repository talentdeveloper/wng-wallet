import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { Dialog } from 'material-ui'

export class TransactionModal extends React.Component {
  render () {
    const {
      intl: { formatMessage },
      show,
      title,
      form
    } = this.props

    return (
      <Dialog
        open={show}
        title={formatMessage({ id: title })}
        modal
        autoScrollBodyContent
        autoDetectWindowHeight={false}>
        <div>{form}</div>
      </Dialog>
    )
  }
}

TransactionModal.propTypes = {
  intl: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired
}

export default injectIntl(TransactionModal)
