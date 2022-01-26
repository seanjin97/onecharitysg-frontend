import React, { useRef } from 'react';
import FormToggle from './FormToggle'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class MainForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'showLogin': true,
            'loginStyle': 'border-l border-t border-r rounded-t',
            'registerStyle': 'hover:text-gray-800',
            'error': false
        };
    }
    
    viewRegister = showLogin => {
        this.setState({
            'showLogin': false,
            'loginStyle': 'hover:text-gray-800',
            'registerStyle': 'border-l border-t border-r rounded-t',
        })
    }   

    viewLogin = showLogin => {
        this.setState({
            'showLogin': true,
            'loginStyle': 'border-l border-t border-r rounded-t',
            'registerStyle': 'hover:text-gray-800',
        })
    }   
    
    render(props) {
        return (
            <div className="lg:w-1/3 bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-4">
                <FormToggle viewRegister={this.viewRegister} viewLogin={this.viewLogin} 
                loginStyle={this.state.loginStyle} registerStyle={this.state.registerStyle}/>
                { this.state.showLogin ? <LoginForm setLoading={this.props.setLoading} stopLoading={this.props.stopLoading} /> : null }
                { this.state.showLogin ? null : <RegisterForm setLoading={this.props.setLoading} stopLoading={this.props.stopLoading} /> }
            </div>

        )
    }

}export default MainForm;