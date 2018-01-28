import React, { Component } from 'react';
import InfiniteCalendar, {withMultipleDates,Calendar,defaultMultipleDateInterpolation } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import * as isMoment from 'moment';

export default class CalendarScreen extends Component {
  
  render() {
    const {nowUid, articles}=this.props
    let createdAtUidArr=[]
    let createdAtUid=[];
    for(let {uid,createdAt} of articles) if(uid===nowUid) {
      createdAtUidArr.push(isMoment(createdAt).format());
      createdAtUid.push([uid,createdAt]);
    }

    return (
      <div>
        <InfiniteCalendar
        Component={withMultipleDates(Calendar)}
        selected={createdAtUidArr}
        interpolateSelection={defaultMultipleDateInterpolation}
        max={createdAtUidArr[createdAtUidArr.length-1]}
        min={createdAtUidArr[0]}
        />
      </div>
    );
  }
}