import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Payment from './Payment'

class Header extends React.Component{

    renderContent = () => {
        if(this.props.auth===null)
        return null
        else if(this.props.auth===false)
        return <a href="/auth/google">sign in with google</a>
        else
        return [<li key="1"><Payment/></li>,
                <li key="3"> Credits:{this.props.auth.credits}</li>
               ,<li key="2"><a href="/api/logout">logout</a></li>]
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to='/' className="brand-logo">emaily</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
    
        )
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
}

export default connect(mapStateToProps)(Header)