const defaultHeaders = {
  Authorization: 'some-authorization',
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const serviceUrl = process.env.API_URL || 'http://localhost:3001'

const request = (url, opts = {}) => {
  const options = {
    headers: defaultHeaders, 
    ...opts
  }
  if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body)
  }
  // return new Promise((resolve, reject) => {
  //   // The reason of this delay is to allow spinner perform the show/hide animation properly.
  //   setTimeout(() => {
  //     fetch(url, options)
  //       .then(res => {
  //         if (!res.ok) {
  //           throw new Error(res.statusText)
  //         }
  //         return res.json()
  //       })
  //       .then(res => resolve(res))
  //       .catch(err => reject(err))
  //   }, 1000)
  // })
  return fetch(url, options)
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json()
  })
}

export default {
  async getCategories () {
    return request(serviceUrl + '/categories')
    .then(result => result.categories)
  },
  async getPosts (category = '') {
    return request(serviceUrl + '/' + (category ? category + '/posts' : 'posts'))
  },
  async getPostById (id) {
    return request(serviceUrl + '/posts/' + id)
  },
  async removePost (id) {
    return request(serviceUrl + '/posts/' + id, {
      method: 'DELETE'
    })
  },
  async updatePost (id, body = {}) {
    return request(serviceUrl + '/posts/' + id, {
      method: 'PUT',
      body
    })
  },
  async votePost (id, body = {}) {
    return request(serviceUrl + '/posts/' + id, {
      method: 'POST',
      body
    })
  },
  async createPost ({ id, timestamp = Date.now(), title, body, author, category }) {
    return request(serviceUrl + '/posts/', {
      method: 'POST',
      body: {
        id,
        timestamp,
        title,
        body,
        author,
        category
      }
    })
  },
  async getComments (postId) {
    return request(serviceUrl + '/posts/' + postId + '/comments')
  },
  async addComment ({ id, timestamp = Date.now(), body, author, parentId }) {
    return request(serviceUrl + '/comments', {
      method: 'POST',
      body: {
        id,
        timestamp,
        body,
        author,
        parentId
      }
    })
  },
  async updateComment (id, body = {}) {
    return request(serviceUrl + '/comments/' + id, {
      method: 'PUT',
      body
    })
  },
  async voteComment (id, body = {}) {
    return request(serviceUrl + '/comments/' + id, {
      method: 'POST',
      body
    })
  },
  async removeComment (id) {
    return request(serviceUrl + '/comments/' + id, {
      method: 'DELETE'
    })
  }
}
