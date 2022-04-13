import React from 'react'
import PropTypes from 'prop-types'

const Login = () => (
    <nav className="login">
        <h2>Invetory Login</h2>
        <p>Sing in to manage your store's inventory</p>
        <button className="github" onClick={() => props.authenticate('Github')}>
            Login with Github
        </button>
        <button
            className="facebook"
            onClick={() => props.authenticate('Facebook')}
        >
            Login with facebook
        </button>
        <button
            className="twitter"
            onClick={() => props.authenticate('Twitter')}
        >
            Login with twitter
        </button>
    </nav>
)

Login.propTypes = {
    authenticate: PropTypes.func.isRequired,
}

export default Login
