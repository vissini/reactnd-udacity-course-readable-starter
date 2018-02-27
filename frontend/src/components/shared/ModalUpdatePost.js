import React,{Component} from 'react'
import PropTypes from 'prop-types'

export default class CreatePostModal extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    onClose: PropTypes.func
  }
  render () {
    const { isLoading, isOpen, onClose, onSubmit, post } = this.props
    return (
      <div className="modal fade show" tabIndex="-1" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg" role="document">
          <form onSubmit={(e) => {
            e.preventDefault()
            if (onSubmit) {
              onSubmit({
                id: post.id,
                title: this.titleInput.value,
                author: this.authorInput.value
              })
            }
          }}>
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
                <h5 className="modal-title" id="exampleModalLabel">Create new Post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                    if (onClose) {
                      onClose()
                    }
                  }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input required defaultValue={post.title} className="form-control" name="title" spellCheck="false" autoComplete="off" ref={(input) => {
                    this.titleInput = input;
                  }}/>
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <input required defaultValue={post.author} className="form-control" spellCheck="false" name="author" autoComplete="off" ref={(input) => {
                    this.authorInput = input;
                  }}/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                  onClick={() => {
                    if (onClose) {
                      onClose()
                    }
                  }}>Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
