import React from 'react'
import { SketchPicker } from 'react-color'

class Sketch extends React.Component {
  state = {
    displayColorPicker: false,
    color: this.props.color,
  };

  handleClick = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = color => {
    this.setState({ color: color.hex })
    this.props.colorPick(color.hex)
  };

  render() {
    const styles = {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: this.state.color,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        right: '0',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    }
    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {
          this.state.displayColorPicker &&
            <div style={styles.popover}>
              <div style={styles.cover} onClick={this.handleClose} />
              <SketchPicker color={this.state.color} onChange={this.handleChange} />
            </div>
        }
      </div>
    )
  }
}

export default Sketch
