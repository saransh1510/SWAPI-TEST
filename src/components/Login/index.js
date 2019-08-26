// import npm packages
import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { connect } from "react-redux";

// import local files
import './login.css';
import  { userLogin } from '../../actions/login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentDidMount() {
    if(localStorage.getItem('email')) {
      this.props.history.push('/home')
    }
  }
  componentDidUpdate() {
    if(
      this.props.loggedInUser
      && ( this.props.loggedInUser.email)
    ) {
      localStorage.setItem('email', this.props.loggedInUser.email)
      this.props.history.push('/home')
    } else if(localStorage.getItem('email')) {
      this.props.history.push('/home')
    }
  }

  handleLogin(event) {
    event.preventDefault();
    if(this.state.email && this.state.pass) {
      this.props.userLogin({
        email: this.state.email,
        pass: this.state.pass,
      });
    }
  }
  
  render() {
    console.log(':: props ', this.props)
    return (
      <Card className='login-card'>
        <CardBody>
          <Form onSubmit={this.handleLogin}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                onChange={(event) => {
                  this.setState({
                    email: event.target.value
                  })
                }}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                onChange={(event) => {
                  this.setState({
                    pass: event.target.value
                  })
                }}
                required
              />
            </FormGroup>
            <Button type="submit">Sign in</Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  loggedInUser: (state.login && state.login.loggedInUser) || {}
});

const mapDispatchToProps = dispatch => ({
  userLogin: data => dispatch(userLogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);