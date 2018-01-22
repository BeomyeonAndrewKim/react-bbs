import React, {Component} from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';

export default class AccountScreen extends Component{
  handleSubmit = e =>{
    e.preventDefault();
    const nickName=e.target.elements.nickName.value;
    this.props.onNickNameSubmit(nickName);    
  }
  render(){
    const {nickName, handleAccountScreen}= this.props;
    return(
      <div>
        <NavBar nickName={nickName} handleAccountScreen={handleAccountScreen}/>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="nickName" placeholder="Edit your Nickname"/>
          <button type="submit">수정</button>
        </form>
      </div>
    )
  }
}