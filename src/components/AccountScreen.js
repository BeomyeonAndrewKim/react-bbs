import React, {Component} from 'react';

export default class AccountScreen extends Component{
  render(){
    return(
      <div>
      <input type="text" placeholder="Edit your Nickname"/>
      <button>수정</button>
      </div>
    )
  }
}