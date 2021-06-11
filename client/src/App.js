import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Header from "./components/Header"
import { connect } from "react-redux"
import * as actions from "./actions"
import Landing from "./components/Landing"
import Dashboard from "./components/Dashboard"
import SurveyNew from "./components/surveys/SurveyNew"

class App extends React.Component {
    componentDidMount = () => {
        this.props.fetchUser()
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route
                                exact
                                path="/surveys"
                                component={Dashboard}
                            />
                            <Route
                                exact
                                path="/surveys/new"
                                component={SurveyNew}
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App)
