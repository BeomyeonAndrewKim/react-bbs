import React,{Component} from 'react';
import NavBar from './NavBar';

export default class BBSList extends Component{
  render(){
    const {uid, handleAccountScreen}=this.props;
    return(
      <div>
        <NavBar uid={uid} handleAccountScreen={handleAccountScreen}/>
        <h1>BBSList</h1>
      </div>
    )
  }
}