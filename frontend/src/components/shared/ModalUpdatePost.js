import React,{Component} from 'react'
import PropTypes from 'prop-types'

import Modal from './Modal'

export default class CreatePostModal extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }
  render () {
    const {post} = this.props
    return (
      <Modal {...this.props}
        title="Edit post"
        getResult={() => ({
          ...post,
          author: this.authorInput.value,
          title: this.titleInput.value
        })}>
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
      </Modal>
    )
  }
}
