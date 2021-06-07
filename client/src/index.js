import "materialize-css/dist/css/materialize.css"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import reducers from "./reducers"
import reduxThunk from "redux-thunk"
import axios from "axios"
window.axios = axios

const store = createStore(reducers, applyMiddleware(reduxThunk))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
