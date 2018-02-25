const defaultHeaders = {
  headers: {
    Authorization: 'some-authorization',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

const request = (url, headers = {}) => {
  return new Promise((resolve, reject) => setTimeout(() => {
    fetch(url, { ...defaultHeaders, ...headers })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(result => resolve(result))
      .catch(err => reject(err))
    }, 1000)
  )
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
  }
}
