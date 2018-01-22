import React,{Component} from 'react';
import NavBar from './NavBar';

export default class BBSList extends Component{
  render(){
    const {nickName, handleAccountScreen}=this.props;
    return(
      <div>
        <NavBar nickName={nickName} handleAccountScreen={handleAccountScreen}/>
        <h1>BBSList</h1>
      </div>
    )
  }
}