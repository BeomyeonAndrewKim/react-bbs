import React,{Component} from 'react';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import * as isMoment from 'moment';
import 'moment/locale/ko';

import NavBar from './NavBar';

const ArticleItemRow = styled(Table.Row)`
  &:hover {
   cursor:pointer;
   background-color:skyblue;
 }
`;

export default class BBSList extends Component{
  
  handleNewArticleClick = e =>{
    this.props.onNewArticleClick();
  }
  handleCalendar= e=>{
    this.props.onCalendar();
  }

  render(){

    const {
      nickName,
      handleAccountScreen,
      articleArr,
      onArticleClick
    }=this.props;

    return(
      <div>
        <NavBar nickName={nickName} handleAccountScreen={handleAccountScreen}/>
        <button onClick={this.handleNewArticleClick}>새 글</button>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>작성일</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              Array.isArray(articleArr) && articleArr.length > 0 ?
              articleArr.map(({articleId, title ,author, createdAt})=>(
                <ArticleItemRow key={articleId} onClick={e=>onArticleClick(articleId)}>
                  <Table.Cell>{author}</Table.Cell>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{isMoment(createdAt).locale('ko').fromNow()}</Table.Cell>
                </ArticleItemRow>
              ))
              : '게시글이 없습니다'
            }
          </Table.Body>
        </Table>
        <button onClick={this.handleCalendar}>캘린더</button>
      </div>
    )
  }
}