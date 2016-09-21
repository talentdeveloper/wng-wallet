import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import { getFormValues, change } from 'redux-form'

import {
  startForging,
  stopForging,
  setForgerNode
} from '../modules/Forging'

import ForgingForm from '../forms/ForgingForm'

const mapActionCreators = (dispatch) => ({
  ...bindActionCreators({
    startForging,
    stopForging
  }, dispatch),
  setForgerNode: (value) => {
    dispatch(setForgerNode(value))
    dispatch(change('forging', 'node', value))
  }
})

const mapStateToProps = (state) => ({
  initialValues: {
    node: state.forging.defaultNode
  },
  defaultNode: state.forging.defaultNode,
  formValues: getFormValues('forging')(state),
  status: state.forging.status,
  effectiveBalance: state.auth.account.effectiveBalance,
  coinName: state.site.coinName,
  nodes: state.forging.nodes
})

export default connect(
  mapStateToProps,
  mapActionCreators
)(injectIntl(ForgingForm))
