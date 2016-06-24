import React, { PropTypes } from 'react'
import { DropDownMenu, MenuItem } from 'material-ui'

class ChangeLocaleMenu extends React.Component {
  _handleChange = (e, index, value) => {
    const { onChange } = this.props
    onChange(value)
  }

  render () {
    const { locale } = this.props
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
          onChange={this._handleChange}
          value={locale}
          style={menuStyle}
          iconStyle={iconStyle}
          underlineStyle={underlineStyle}
          labelStyle={labelStyle}>
          <MenuItem value='en' primaryText='English' />
          <MenuItem value='zh' primaryText='中文' />
          <MenuItem value='my' primaryText='Bahasa Melayu' />
          <MenuItem value='ta' primaryText='தமிழ்' />
          <MenuItem value='it' primaryText='Italiano' />
        </DropDownMenu>
      </div>
    )
  }
}

ChangeLocaleMenu.propTypes = {
  onChange: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
}

export default ChangeLocaleMenu
