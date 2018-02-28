import React, {Component} from 'react'
import {connect} from 'react-redux'

import {
  openModal,
  closeModal
} from '../../actions/modal'

class Modal extends Component {
  componentDidMount () {
    this.props._openModal()
    if (this.props.onOpen) {
      this.props.onOpen()
    }
  }
  onClose () {
    this.props._closeModal()
    if (this.props.onClose) {
      this.props.onClose()
    }
  }
  onSubmit () {
    if (!this.props.preventCloseOnSubmit) {
      this.onClose()
    }
    if (this.props.onSubmit) {
      this.props.onSubmit(
        this.props.getResult ? this.props.getResult() : {}
      )
    }
  }
  render () {
    const { isLoading, isOpen, title = '' } = this.props
    return (
      <div className="modal fade show" tabIndex="-1" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg" role="document">
          <form onSubmit={(e) => {
            e.preventDefault()
              this.onSubmit()
            }
          }>
            <div className="modal-content">
              <div className="body-loading loading-content" style={{ borderRadius: '10px', display: (isLoading ? 'flex' : 'none') }}>
                <div className="loading center">
                  <strong>Please wait</strong>
                  <span>
                    <i>Loading ...</i>
                  </span>
                </div>
              </div>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.onClose() }>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.props.children}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                  onClick={() => this.onClose()}>Close</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    _openModal: () => dispatch(openModal()),
    _closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
