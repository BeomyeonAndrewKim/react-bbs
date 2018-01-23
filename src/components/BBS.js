import React, {Component} from 'react';
import Login from './LoginScreen';
import BBSList from './BBSList';
import * as firebase from 'firebase';
import AccountScreen from './AccountScreen'
import Loading from './Loading'
import BBSContents from './BBSContents'
import NewArticleScreen from './NewArticleScreen';

export default class BBS extends Component{
  state = {
    page:'loading'
  }
  componentDidMount(){
    const config = {
      apiKey: "AIzaSyBzTPdE2X6jrR7K-pgJuMy_N1sLrSxBMY4",
      authDomain: "react-bbs.firebaseapp.com",
      databaseURL: "https://react-bbs.firebaseio.com",
      projectId: "react-bbs",
      storageBucket: "react-bbs.appspot.com",
      messagingSenderId: "609470552804"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const snapshot= await firebase.database().ref(`users/${user.uid}/nickName`).once('value');
        this.setState((prevState)=>{
          return{
            page:'BBSList',
            uid:user.uid,
            nickName:snapshot.val()
          }
        })
        this.fecthAricles();
      } else {
        this.setState((prevState)=>{
          return{
            page:'login'
          }
        })
      }
    });
  }
  handleAccountScreen=()=>{
    this.setState((prevState)=>{
      return{
        page:'AccountScreen'
      }
    })
  }

  saveNickName = async nickName =>{
    const {uid} = this.state;
    await firebase.database().ref(`users/${uid}/nickName`).set(nickName);
    this.setState({
      nickName,
      page:'BBSList'
    })
  }

  fecthAricles = async ()=>{
    const snapshot= await firebase.database().ref(`articles`).once('value');
    const articlesObj=snapshot.val();
    if(articlesObj == null){
      this.setState({
        articles: null
      });
    } else {
      const articles = Object.entries(articlesObj).map(([articleId,articleItem])=>{
        return{
          ...articleItem,
          articleId
        }
      })
      const uidSet=new Set(articles.map(({uid})=> uid));
      const uidObj={};

      const ps = Array.from(uidSet).map(async uid=>{
        const snapshot = await firebase.database().ref(`users/${uid}/nickName`).once('value');
        const nickName= snapshot.val();
        return [uid,nickName];
      })
      const pairArr = await Promise.all(ps);
      for (const [uid,nickName] of pairArr){
        uidObj[uid]=nickName;
      }
      // for( const uid of uidArr){
      //   const nickNameSnapshot = await firebase.database().ref(`users/${uid}/nickName`).once('value');
      //   const nickName = nickNameSnapshot.val();
      //   uidObj[uid]=nickName;
      // }
      articles.forEach(article =>{
        article.author=uidObj[article.uid];
      })
      this.setState({
        articles
      });
    }
  }
  viewArticle = async articleId =>{
    const [articleSnapshot, contentSnapshot] = await Promise.all([
      firebase.database().ref(`articles/${articleId}`).once('value'),
      firebase.database().ref(`contents/${articleId}`).once('value')
    ])
    const article = articleSnapshot.val();
    const content = contentSnapshot.val();
    this.setState({
      currentArticle:{
        ...article,
        content
      },
      page: 'BBSContents'
    })
  }

  pageToNewArticle = () =>{
    this.setState({
      page:'new-article'
    })
  }

  saveArticle= async article =>{
    const p1 = firebase.database().ref('articles').push({
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      title: article.title,
      uid: this.state.uid
    })
    const p2=firebase.database().ref(`contents/${p1.key}`).set(article.content);
    await Promise.all([p1,p2]);
    this.viewArticle(p1.key);
  }

  render(){
    const nickName=this.state.nickName? this.state.nickName : this.state.uid
    const{articles, currentArticle}=this.state;
    // const {nickName , uid}=this.state;
    return(
      <div>
        { this.state.page==='loading'
          ? <Loading/>
          : this.state.page==='login'
          ? <Login />
          : this.state.page==='BBSList'
          ? <BBSList
              nickName={nickName}
              onArticleClick={this.viewArticle}
              handleAccountScreen={this.handleAccountScreen}
              articleArr={articles}
              onNewArticleClick={this.pageToNewArticle}
            />
          : this.state.page==='AccountScreen'
          ? <AccountScreen
            nickName={nickName}
            handleAccountScreen={this.handleAccountScreen}
            onNickNameSubmit={this.saveNickName}/>
          : this.state.page==='BBSContents'
          ? <BBSContents 
          {...currentArticle}
          nickName={nickName}
          handleAccountScreen={this.handleAccountScreen}
          />
          : this.state.page==='new-article'
          ?<NewArticleScreen
            onFormSubmit={this.saveArticle}
            nickName={nickName}
            handleAccountScreen={this.handleAccountScreen}
            />
          : null
        }
      </div>
    )
  }
}
