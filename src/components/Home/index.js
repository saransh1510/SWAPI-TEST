// import npm packages
import React, { Component } from 'react';
import {
  Card,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';
import { connect } from "react-redux";

// import local files
import './home.css';
import axios from '../../utils/axios';
import {search} from '../../actions/search';
import Planet from './Planet';
import { userLogout } from '../../actions/login';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  componentDidMount() {
    if(!localStorage.getItem('email')) {
      this.props.history.push('/')
    }
  }

  handleOnSearch(val) {
    if(val.length > 2) {
      this.searchApi(val);
    }
  }

  handleOnSubmit(event) {
    event.preventDefault();
    if(this.state.search.length > 2) {
      this.searchApi(this.state.search);
    }
  }
  
  searchApi (val) {
    axios.get(`/planets/?search=${val.toLowerCase()}`).then(res => {
      console.log(':: res ',res)
      if(
        res
        && res.status === 200
      ) {
        if(
          res.data
          && res.data.results
        ) {
            this.props.search(res.data.results)
        }
      }
    })
  }

  render() {
    console.log(':: planet ', this.props.planets)
    return (
      <Card className='home-card'>
        <Form
          inline
          onSubmit={this.handleOnSubmit}
        >
          <FormGroup style={{width: '80%'}}>
            <Input
              type="text"
              name="search-planet"
              id="search-planet"
              style={{
                width: '90%'
              }}
              onChange={(event) => {
                this.setState({
                  search: event.target.value
                });
                this.handleOnSearch(event.target.value);
              }}
              required
            />
          </FormGroup>
          <Button type='submit'>Search</Button>
        </Form>
        {
          this.props.planets ?
            this.props.planets.length >0 ?
              this.props.planets.map(planet => 
                <Planet planet={planet} key={planet.name} />
              )
            :
                <div> No Planet Found...</div>
          :
            ''
        }
        <Button
          style={{
            float: 'right',
            width:'90px',
            marginTop: '10px',
            background: 'transparent',
            border: 'navajowhite',
            color: '#6c757d',
          }}
          onClick={() => {
            this.props.userLogout()
            localStorage.removeItem('email')
            this.props.history.push('/')
          }}
        > 
          Log out
        </Button>
      </Card>
    )
  }
}


const mapStateToProps = state => ({
  planets: state
    && state.searchPlanet
    && state.searchPlanet
    && state.searchPlanet.planets ?
      state.searchPlanet.planets.length > 0 ?
        state.searchPlanet.planets
      : []
    : null
});

const mapDispatchToProps = dispatch => ({
  search: data => dispatch(search(data)),
  userLogout: () => dispatch(userLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);