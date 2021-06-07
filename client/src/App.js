import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import {connect} from 'react-redux'
import * as actions from './actions'
import Surveys from './components/Surveys'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'

const SurveyNew = () => <div>survey new</div>

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
            <Route exact path="/" component={Landing}/>
            <Route exact path="/surveys" component={Dashboard}/>
            <Route exact path="/surveys/new" component={SurveyNew}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
  
}

export default connect(null,actions)(App);
