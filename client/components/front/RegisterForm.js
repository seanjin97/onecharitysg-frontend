import Link from 'next/link'
import Alert from "./alerts/Alert";
import GreenAlert from "./alerts/GreenAlert";

class RegisterForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            // 'url': 'https://g1t3-node-auth-srv.cfapps.us10.hana.ondemand.com/api/register',
            // 'url': 'http://localhost:5000/api/register',
            'url': '/api/register',
            'email': null,
            'name': null,
            'password': null,
            'error': false,
            'status': null,
            'loading': false,
            'register': false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    closeAlert = (e) => {
        this.setState({
            'error': false,
            'register': false
        })
    }

    handleChange = (e) => {
        let id = e.target.getAttribute('id'); 

        if (id == 'email') {
            this.setState({
                'email': e.target.value
            });
        } 
        else if (id == 'name') {
            this.setState({
                'name': e.target.value
            });
        }
        else if (id == 'register-password') {
            this.setState({
                'password': e.target.value
            });
        };
    }

    handleSubmit = async (e) => {
        this.props.setLoading();

        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": this.state.email,
                "name" : this.state.name,
                "password": this.state.password
            }),
            credentials: "include",
        };

        try {
            const response = await fetch(this.state.url, requestOptions);
            const data = await response.json();
            
            if (response.ok) {
                this.setState({
                    'register': true
                })
                console.log('prompt');
            }
            else {
                // invalid params
                console.log(data.status);
                this.setState({
                    'error': true,
                    'status': "Email already exist!"
                });
            }
        } catch (error) {
            this.props.displayAlert;
            console.log(error);
            this.setState({
                'error': true,
                'status': "Register server might be down!"
            });
        }
        this.props.stopLoading();
    }   

    render () {
        return (
            <div>
                { this.state.error ? <Alert status={this.state.status} close={this.closeAlert}/> : null }
                { this.state.register ? <GreenAlert status={this.state.status} close={this.closeAlert}/> : null }
            <form onSubmit={this.handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input required onChange={this.handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input required onChange={this.handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input required onChange={this.handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="register-password" type="password" placeholder="******************" autoComplete="off"/>
                    <p className="text-red-500 text-xs italic hidden">Please choose a password.</p>
                </div>

                <div className="mb-6">
                    <input className="cursor-pointer w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" id="signup" name="register" value="Register" />
                    <Link href="#"><a className="lg:flex lg:justify-center font-bold text-sm text-blue-500 hover:text-blue-800 mt-5" href="#">Forgot Password?</a></Link>
                </div>
            </form>
            </div>
        )
    }
}
export default RegisterForm;