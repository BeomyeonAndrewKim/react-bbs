import React, { Component } from 'react';

import NavBar from './NavBar';

export default class BBSContents extends Component {
  render() {
    const {title, content, nickName, handleAccountScreen} = this.props;
    return (
      <div>
      <NavBar nickName={nickName} handleAccountScreen={handleAccountScreen}/>
      <div>
        {title}
        {content}
      </div>
      </div>
    );
  }
}