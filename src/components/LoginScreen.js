import React,{Component} from 'react';
import * as firebase from 'firebase';

export default class LoginScreen extends Component{
  handleLoginClick= ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(user);
    })
  }
  render(){
    return(
      <button onClick={this.handleLoginClick}>Google Login</button>
    )
  }
}