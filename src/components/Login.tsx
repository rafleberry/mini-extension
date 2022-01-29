import React from 'react'
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { login } from '../state/actions/auth';

const LoginWrapper = styled(`form`)({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})

const LoginInput = styled('div')({
    padding: '20px'
})

class Login extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    public render() {
        return (<LoginWrapper>
            <LoginInput><label>Student Name: </label><input type="text" onChange={this.inputChange} /></LoginInput>
            <button onClick={this.handleLogin}>Login</button>
        </LoginWrapper >)
    }

    private inputChange = (e: any) => {
        this.setState({ inputValue: e.target.value })
    }

    private handleLogin = () => {
        // @ts-ignore
        this.props.login(this.state.inputValue)
    }
}

export default connect(null, { login })(Login)