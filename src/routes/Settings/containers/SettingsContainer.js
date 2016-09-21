import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import Settings from '../components/Settings'

const mapStateToProps = (state) => ({
  encryptedSecretPhrase: state.auth.account.encryptedSecretPhrase
})

export default connect(
  mapStateToProps
)(injectIntl(Settings))
