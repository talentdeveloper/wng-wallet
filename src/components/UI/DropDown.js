import React, { PropTypes } from 'react'
import { DropDownMenu } from 'material-ui'

class DropDown extends React.Component {
  render () {
    const { value, items, onChange } = this.props

    const wrapperStyle = {
      margin: 8,
      display: 'inline-block',
      boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
    }

    const menuStyle = {
      backgroundColor: 'white',
      borderRadius: 2,
      height: 36,
      lineHeight: '36px',
      padding: 0
    }

    const iconStyle = {
      right: 8,
      top: 8
    }

    const underlineStyle = {
      display: 'none'
    }

    const labelStyle = {
      lineHeight: '36px'
    }

    return (
      <div style={wrapperStyle}>
        <DropDownMenu
          onChange={onChange}
          value={value}
          style={menuStyle}
          iconStyle={iconStyle}
          underlineStyle={underlineStyle}
          labelStyle={labelStyle}>
          {items}
        </DropDownMenu>
      </div>
    )
  }
}

DropDown.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}

export default DropDown
