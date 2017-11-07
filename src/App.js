import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import firebase from 'firebase'
import AuthProvider from './util/auth'

const Nav = styled.nav`
    min-height: 3.5rem;
    position: relative;
    padding: 1rem 0;
    display: flex;
    align-items: stretch;
    z-index: 10;
    position: fixed;
    padding: .5rem 0;
    width: 100%;
    top: 0;
    background: #333;
    transition: all 0.3s ease;
`

const Google = styled.button`
  padding: 15px 10px;
  color: #333;
  top: 150px;
  position: relative;
  cursor: pointer;
  color: #fff;
  background-color: #de4634;
  border-color: #de4634;
`

const Facebook = styled(Google)`
  background-color: #4367b2;
  border-color: #4367b2;
`

const LogOut = styled(Google)`
  background-color: #333;
  border-color: #333;
`


const Header = styled.header`
  color: #333;
  font-size : 18px;
  font-weight: bold;
  top: 120px;
  position: relative
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  componentDidMount() {
    this.setCurrentUser()
  }

  handleGoogleSignin () {
    let self = this
    firebase.auth().signInWithPopup(AuthProvider.google).then(function(result) {
      self.setCurrentUser()
    }).catch(function(error) {
      console.log('error', error)
    });
  }

  handleFacebookSignin = () => {
    let self = this
    firebase.auth().signInWithPopup(AuthProvider.facebook).then(function(result) {
      self.setCurrentUser()
    }).catch(function(error) {
      console.log('error', error)
    });
  }

  handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      this.setCurrentUser()
    }).catch((error) => {
      console.log('error', error)
    })
  }

  setCurrentUser = () => {
    this.setState({
      isLogin : firebase.auth().currentUser !== null,
      displayName : firebase.auth().currentUser ?
        firebase.auth().currentUser.displayName :
        'Anonymous'
    })
  }

  isLogin = (isLogin) => {
    if (isLogin) {
      return [
        <LogOut key={'signout'} onClick={this.handleSignOut.bind(this)}> Sign Out </LogOut>,
      ]
    }

    return [
      <Google key={'google'} onClick={this.handleGoogleSignin.bind(this)}> Google Sign </Google>,
      <Facebook key={'facebook'} onClick={this.handleFacebookSignin.bind(this)}> Facebook Sign </Facebook>
    ]
  }

  render() {
    return (
      <div className="App">
        <Nav>
            <img src={logo} className="App-logo" alt="logo" />
        </Nav>
        <Header> Welcome { this.state.displayName } to ReactJs </Header>
        {this.isLogin(this.state.isLogin)}
      </div>
    );
  }
}

export default App;
