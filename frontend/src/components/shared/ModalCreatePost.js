import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {capitalizeFirstLetter} from '../../utils'

export default class CreatePostModal extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    onClose: PropTypes.func,
    categories: PropTypes.array.isRequired
  }
  render () {
    const { isLoading, isOpen, onClose, onSubmit, categories } = this.props
    return (
      <div className="modal fade show" tabIndex="-1" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg" role="document">
          <form onSubmit={(e) => {
            e.preventDefault()
            if (onSubmit) {
              onSubmit({
                title: this.titleInput.value,
                content: this.contentTextArea.value,
                category: this.categoryInput.value,
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
                  <input required autoFocus="true" className="form-control" name="title" spellCheck="false" autoComplete="off" ref={(input) => {
                    this.titleInput = input;
                  }}/>
                </div>
                <div className="row">
                  <div className="col col-xs-6">
                    <div className="form-group">
                      <label>Author</label>
                      <input required className="form-control" spellCheck="false" name="author" autoComplete="off" ref={(input) => {
                        this.authorInput = input;
                      }}/>
                    </div>
                  </div>
                  <div className="col col-xs-6">
                    <div className="form-group">
                      <label>Category</label>
                      <select className="form-control" name="category" required ref={(input) => {
                        this.categoryInput = input;
                      }}>
                        <option value="" >Select category</option>
                        {categories && categories.map(category => (
                          <option key={category.name} value={category.name}>
                            {capitalizeFirstLetter(category.name)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea required  rows={10} className="form-control" spellCheck="false" name="body" autoComplete="off" ref={(textarea) => {
                    this.contentTextArea = textarea;
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
