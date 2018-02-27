const defaultHeaders = {
  Authorization: 'some-authorization',
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

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
    return request('http://localhost:3001/categories')
    .then(result => result.categories)
  },
  async getPosts (category = '') {
    return request('http://localhost:3001/' + (category ? category + '/posts' : 'posts'))
  },
  async getPost (id) {
    return request('http://localhost:3001/posts/' + id)
  },
  async removePost (id) {
    return request('http://localhost:3001/posts/' + id, {
      method: 'DELETE'
    })
  },
  async updatePost (id, body = {}) {
    return request('http://localhost:3001/posts/' + id, {
      method: 'PUT',
      body
    })
  },
  async votePost (id, body = {}) {
    return request('http://localhost:3001/posts/' + id, {
      method: 'POST',
      body
    })
  },
  async createPost ({ id, timestamp = Date.now(), title, body, author, category }) {
    return request('http://localhost:3001/posts/', {
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
  }
}
