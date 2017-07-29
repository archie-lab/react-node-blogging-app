const Router = window.ReactRouter.Router;
const Route = window.ReactRouter.Route;
const Link = window.ReactRouter.Link;
const hashHistory = window.ReactRouter.hashHistory;

class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  signIn(e) {
    e.preventDefault();
    axios.post('/signin', {
      email: this.state.email,
      password: this.state.password
    }).then((response => console.log(response)))
        .catch((error) => console.log(error));
  }

  render() {
    return (
        <form className="signin-form">
          <h2 className="signin-form-heading">Please sign in</h2>
          <label htmlFor="signinEmail" className="sr-only">Email address</label>
          <input id="signinEmail"
                 className="form-control"
                 type="email"
                 onChange={this.handleEmailChange}
                 placeholder="Email" required autoFocus/>
          <label htmlFor="signinPassword" className="sr-only">Password</label>
          <input id="signinPassword"
                 className="form-control"
                 type="password"
                 onChange={this.handlePasswordChange}
                 placeholder="Password" required/>
          <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.signIn}>Log In</button>
          <Link to="/signup">{'Signup'}</Link>
        </form>
    );
  }
}

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: '', email: '', password: ''};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  signUp(e) {
    e.preventDefault();
    axios.post('/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then((response) => console.log(response))
        .catch((error) => console.log(error));
  }

  render() {
    return (
        <form className="signin-form">
          <h2 className="signin-form-heading">Please sign in</h2>
          <label htmlFor="signinName" className="sr-only">Username</label>
          <input id="signinName"
                 className="form-control"
                 type="text"
                 onChange={this.handleNameChange}
                 placeholder="Name" required autoFocus/>
          <label htmlFor="signinEmail" className="sr-only">Email address</label>
          <input id="signinEmail"
                 className="form-control"
                 type="email"
                 onChange={this.handleEmailChange}
                 placeholder="Email" required/>
          <label htmlFor="signinPassword" className="sr-only">Password</label>
          <input id="signinPassword"
                 className="form-control"
                 type="password"
                 onChange={this.handlePasswordChange}
                 placeholder="Password" required/>
          <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.signUp}>Sign up</button>
          <Link to="/">{'Signin'}</Link>
        </form>
    );
  }
}

ReactDOM.render(
    <Router history={hashHistory}>
      <Route component={Signin} path="/"/>
      <Route component={Signup} path="/signup"/>
    </Router>,
    document.getElementById('app')
);