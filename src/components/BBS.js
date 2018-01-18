import React, {Component} from 'react';
import Login from './LoginScreen';
import BBSList from './BBSList';
import * as firebase from 'firebase';
import AccountScreen from './AccountScreen'
import Loading from './Loading'

export default class BBS extends Component{
  state = {
    page:'loading'
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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState((prevState)=>{
          return{
            page:'BBSList',
            uid:user.uid
          }
        })
      } else {
        this.setState((prevState)=>{
          return{
            page:'login'
          }
        })
      }
    });
  }
  handleAccountScreen=()=>{
    this.setState((prevState)=>{
      return{
        page:'AccountScreen'
      }
    })
  }
  render(){
    return(
      <div>
        { this.state.page==='loading'
          ? <Loading/>
          : this.state.page==='login'
          ? <Login />
          : this.state.page==='BBSList'
          ? <BBSList uid={this.state.uid} handleAccountScreen={this.handleAccountScreen}/>
          : this.state.page==='AccountScreen'
          ? <AccountScreen />
          : null
        }
      </div>
    )
  }
}
