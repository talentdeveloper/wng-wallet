import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import DocumentTitle from 'react-document-title'

class PageTitle extends React.Component {
  render () {
    const {
      pageName, intl: {
        formatMessage
      }
    } = this.props

    const siteName = formatMessage({ id: 'website_name' })

    return (
      <DocumentTitle title={`${formatMessage({ id: pageName })} | ${siteName}`}>
        {this.props.children}
      </DocumentTitle>
    )
  }
}

PageTitle.propTypes = {
  children: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  pageName: PropTypes.string.isRequired
}

export default injectIntl(PageTitle)
