import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { SelectField, MenuItem } from 'material-ui'

class ForgerNodeMenu extends React.Component {
  _onChange = (e, index, value) => {
    const { onChange } = this.props
    onChange(value)
  }

  render () {
    const {
      intl: { formatMessage },
      selectedNode,
      nodes
    } = this.props

    const items = nodes.map((node) => {
      return <MenuItem value={node} primaryText={node} key={node} />
    })

    return (
      <SelectField
        value={selectedNode}
        onChange={this._onChange}
        floatingLabelText={formatMessage({ id: 'default_forging_node' })}
        hintText={'test'}
        fullWidth>
          {items}
      </SelectField>
    )
  }
}

ForgerNodeMenu.propTypes = {
  intl: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedNode: PropTypes.string.isRequired,
  nodes: PropTypes.array.isRequired
}

export default injectIntl(ForgerNodeMenu)
