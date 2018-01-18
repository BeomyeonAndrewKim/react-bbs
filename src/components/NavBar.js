import React, {Component} from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';

const Wrap=styled.nav`
  display:flex;
  background-color: #d59df2;
  padding: 10px;
  align-items:center;
`;

const InnerLeft=styled.div`
  flex-grow: 1;
  color: white;
  font-size: 2em;
`;
const LogoutBtn=styled.button`
  background-color: #ffffff;
  border:none;
  width:80px;
  height:25px;
  font-size:13px;
  border-radius: 10px;
`;

const NickName=styled.a`
  color:white;
  padding: 10px;
`

export default class NavBar extends Component{
  handleLogoutClick=()=>{
    firebase.auth().signOut();
  }
  handleNicknameClick=()=>{
    this.props.handleAccountScreen();
  }
  render(){
    return(
      <Wrap>
        <InnerLeft>BBS</InnerLeft>
        <LogoutBtn onClick={this.handleLogoutClick}>Sign Out</LogoutBtn>
        <NickName href='#' onClick={this.handleNicknameClick}>{this.props.uid}</NickName>
      </Wrap>
    )
  }
}