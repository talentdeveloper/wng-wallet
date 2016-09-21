import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import { getForging } from 'redux/modules/forging'
import { convertToNXT } from 'redux/utils/nrs'

import Forging from '../components/Forging'

const mapActionCreators = {
  getForging
}

const mapStateToProps = (state) => ({
  status: state.forging.status,
  node: state.form.forging && state.form.forging.values.node || state.forging.defaultNode,
  forgedBalance: convertToNXT(state.auth.account.forgedBalanceNQT)
})

export default connect(
  mapStateToProps,
  mapActionCreators
)(injectIntl(Forging))
