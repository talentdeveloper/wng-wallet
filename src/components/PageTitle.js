import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import DocumentTitle from 'react-document-title'

class PageTitle extends React.Component {
  render () {
    const {
      pageName,
      intl: {
        formatMessage
      }
    } = this.props

    const siteName = formatMessage({ id: 'website_name' })

    return (
      <DocumentTitle title={`${formatMessage({ id: pageName })} | ${siteName}`}>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {this.props.children}
        </div>
      </DocumentTitle>
    )
  }
}

PageTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  intl: PropTypes.object.isRequired,
  pageName: PropTypes.string.isRequired
}

PageTitle.defaultProps = {
  pageName: 'home'
}

export default injectIntl(PageTitle)
