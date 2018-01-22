import React,{Component} from 'react';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';

import NavBar from './NavBar';


export default class BBSList extends Component{
  render(){
    const {nickName, handleAccountScreen, articleArr}=this.props;
    return(
      <div>
        <NavBar nickName={nickName} handleAccountScreen={handleAccountScreen}/>
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
                <Table.Row key={articleId}>
                  <Table.Cell>{author}</Table.Cell>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{createdAt}</Table.Cell>
                </Table.Row>
              ))
              : '게시글이 없습니다'
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}