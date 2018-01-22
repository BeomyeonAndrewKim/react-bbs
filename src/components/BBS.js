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
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const snapshot= await firebase.database().ref(`users/${user.uid}/nickName`).once('value');
        
        this.setState((prevState)=>{
          return{
            page:'BBSList',
            uid:user.uid,
            nickName:snapshot.val()
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
  saveNickName = async nickName =>{
    const {uid} = this.state;
    await firebase.database().ref(`users/${uid}/nickName`).set(nickName);
    this.setState({
      nickName,
      page:'BBSList'
    })
  }
  render(){
    const nickName=this.state.nickName? this.state.nickName : this.state.uid
    // const {nickName , uid}=this.state;
    return(
      <div>
        { this.state.page==='loading'
          ? <Loading/>
          : this.state.page==='login'
          ? <Login />
          : this.state.page==='BBSList'
          ? <BBSList nickName={nickName} handleAccountScreen={this.handleAccountScreen}/>
          : this.state.page==='AccountScreen'
          ? <AccountScreen
            nickName={nickName}
            handleAccountScreen={this.handleAccountScreen}
            onNickNameSubmit={this.saveNickName}/>
          : null
        }
      </div>
    )
  }
}
