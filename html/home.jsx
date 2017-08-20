var Router = window.ReactRouter.Router
var Route = window.ReactRouter.Route
var hashHistory = window.ReactRouter.hashHistory

class ShowPost extends React.Component {
  constructor (props) {
    super(props)
    this.state = {posts: []}
    this.getPosts = this.getPosts.bind(this)
    this.updatePost = this.updatePost.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }

  componentDidMount () {
    this.getPosts()

    document.getElementById('homeHyperlink').className = 'active'
    document.getElementById('addPostHyperlink').className = ''
  }

  getPosts () {
    const self = this

    axios.get('/posts').then((response) => {
      console.log('get posts response', response)
      self.setState({posts: response.data})
    }).catch((error) => {
      console.log('get posts error', error)
    })
  }

  updatePost (id) {
    console.log('update ', id)
    hashHistory.push('/posts/' + id + '/edit')
  }

  deletePost (id) {
    const self = this
    console.log('delete ', id)
    axios.delete('/posts/' + id).then((response) => {
      console.log(`post with id=${id} is deleted, response`, response)
      self.getPosts()
    }).catch(error => console.log(error))
  }

  render () {
    const self = this
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Subject</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {
          this.state.posts.map(function (post, index) {
            return <tr key={index}>
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{post.subject}</td>
              <td>
                <button onClick={() => self.updatePost(post._id)}
                        className="btn btn-link">
                  <span className="glyphicon glyphicon-pencil" />
                </button>
              </td>
              <td>
                <button onClick={() => self.deletePost(post._id)}
                        className="btn btn-link">
                  <span className="glyphicon glyphicon-remove" />
                </button>
              </td>
            </tr>
          })
        }
        </tbody>
      </table>
    )
  }
}

class AddPost extends React.Component {
  constructor (props) {
    super(props)
    this.state = {title: '', subject: '', id: ''}
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSubjectChange = this.handleSubjectChange.bind(this)
    this.getPostWithId = this.getPostWithId.bind(this)
    this.addPost = this.addPost.bind(this)
    this.updatePost = this.updatePost.bind(this)
  }

  componentDidMount () {
    document.getElementById('homeHyperlink').className = ''
    document.getElementById('addPostHyperlink').className = 'active'

    if (this.props.params.id) {
      this.getPostWithId()
    }
  }

  handleTitleChange (e) {
    this.setState({title: e.target.value})
  }

  handleSubjectChange (e) {
    this.setState({subject: e.target.value})
  }

  getPostWithId () {
    const id = this.props.params.id
    const self = this
    axios.get('/posts/' + id).then(function (response) {
      console.log(`get post by id=${id} response:`, response)
      if (response) {
        self.setState({
          title: response.data.title,
          subject: response.data.subject,
          id: response.data._id
        })
      }
    }).catch(function (error) {
      console.log(`get post by id=${id} error:`, error)
    })
  }

  addPost () {
    axios.post('/posts', {
      title: this.state.title,
      subject: this.state.subject
    }).then((response) => {
      console.log('addPost response', response)
      hashHistory.push('/')
    }).catch((error) => {
      console.log('addPost error', error)
    })
  }

  updatePost () {
    axios.put('/posts/' + this.state.id, {
      title: this.state.title,
      subject: this.state.subject
    }).then((response) => {
      console.log('updatePost response', response)
      hashHistory.push('/')
    }).catch((error) => {
      console.log('updatePost error', error)
    })
  }

  render () {
    const hasId = this.state.id && this.state.id.length > 0
    return (
      <div className="col-md-5">
        <div className="form-area">
          <form role="form">
            <br />
            <div className="form-group">
              <input type="text"
                     className="form-control"
                     id="title"
                     name="title"
                     value={this.state.title}
                     onChange={this.handleTitleChange}
                     placeholder="Title" required />
            </div>

            <div className="form-group">
              <textarea className="form-control"
                          type="textarea"
                          id="subject"
                          placeholder="Subject"
                          value={this.state.subject}
                          onChange={this.handleSubjectChange}
                          maxLength="140"
                          rows="7" />
            </div>

            <button type="button"
                    id="submit"
                    name="submit"
                    className="btn btn-primary pull-right"
                    onClick={hasId ? this.updatePost : this.addPost}>{hasId
              ? 'Update'
              : 'Add'} Post
            </button>
          </form>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={ShowPost} path="/" />
    <Route component={AddPost} path="/posts/add" />
    <Route component={AddPost} path="/posts/:id/edit" />
  </Router>,
  document.getElementById('app'))
