import React,{Component} from 'react';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';

import NavBar from './NavBar';

const mockDate=[
  {
    articleID:'-LB1',
    author:'andrew',
    title: '게시글 제목 1',
    createdAt: '2018-01-20'
  },
  {
    articleID:'0d21',
    author:'andrew',
    title:'게시글 제목 2',
    createdAt: '2018-01-12'
  }
]
  
const ArticleItemRow = styled(Table.Row)`
  &:hover{
    cursor:pointer;
    background-color:#d5b6ef;
  }
`

export default class BBSList extends Component{
  render(){
    const {nickName, handleAccountScreen}=this.props;
    return(
      <div>
        <NavBar nickName={nickName} handleAccountScreen={handleAccountScreen}/>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>작성일</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              mockDate.map(({articleID, title ,author, createdAt})=>(
                <ArticleItemRow key={articleID}>
                  <Table.Cell>{author}</Table.Cell>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{createdAt}</Table.Cell>
                </ArticleItemRow>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}