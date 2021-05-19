import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import {connect} from 'react-redux'
import * as actions from './actions'
import Surveys from './components/Surveys'


class App extends React.Component{

  componentDidMount = () =>{
     this.props.fetchUser()
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Header/>
          <Switch>
            <Route exact path="/" component={Surveys}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
  
}

export default connect(null,actions)(App);
