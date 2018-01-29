import React, { Component } from 'react';
import InfiniteCalendar, {withMultipleDates,Calendar,defaultMultipleDateInterpolation } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import * as isMoment from 'moment';
import * as firebase from 'firebase';

export default class CalendarScreen extends Component {
  
  render() {
    const {nowUid, articles, articleId}=this.props
    let createdAtUidArr=[]
    let createdAtUid=[];
    let createdAtContents=[];
    for(let {uid,createdAt} of articles) if(uid===nowUid) {
      createdAtUidArr.push(isMoment(createdAt).format());
      createdAtUid.push([uid,createdAt]);
      createdAtContents.push(isMoment(createdAt).format("YYYY-MM-DD"))
    }
    console.log(articles);
    return (
      <div>
        <InfiniteCalendar
        Component={withMultipleDates(Calendar)}
        selected={createdAtUidArr}
        interpolateSelection={defaultMultipleDateInterpolation}
        max={createdAtUidArr[createdAtUidArr.length-1]}
        min={createdAtUidArr[0]}
        onSelect={async date=>{
            for(let {createdAt,articleId} of articles){
              if(isMoment(createdAt).format('YYYY-MM-DD')===isMoment(date).format('YYYY-MM-DD')){
                const snapshot = await firebase.database().ref(`contents/${articleId}`).once('value');
                alert(snapshot.val());  
              }
            }
          }
        }
        />
      </div>
    );
  }
}