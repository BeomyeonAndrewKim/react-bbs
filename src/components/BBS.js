import React, {Component} from 'react';
import Login from './LoginScreen';
import * as firebase from 'firebase';

export default class BBS extends Component{
  state = {
    page:'login'
  }
  componentDidMount(){
    const config = {
      apiKey: "AIzaSyBzTPdE2X6jrR7K-pgJuMy_N1sLrSxBMY4",
      authDomain: "react-bbs.firebaseapp.com",
      databaseURL: "https://react-bbs.firebaseio.com",
      projectId: "react-bbs",
      storageBucket: "react-bbs.appspot.com",
      messagingSenderId: "609470552804"
    };
    firebase.initializeApp(config);
  }
  render(){
    return(
      <div>
        {
          this.state.page==='login'
          ? <Login/>
          : null
        }
      </div>
    )
  }
}
