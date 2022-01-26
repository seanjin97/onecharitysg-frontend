import classnames from 'classnames';

class FormToggle extends React.Component {
	constructor(props) {
		super(props);
	}

	render(viewRegister, viewLogin, loginStyle, registerStyle) {
		return (
			<ul className='list-reset flex justify-center'>
				<li className='mb-5 mr-1 flex w-full' onClick={this.props.viewLogin}>
					<span
						className={classnames(
							this.props.loginStyle,
							'cursor-pointer text-center lex w-full bg-white inline-block py-2 px-4 text-blue-800 font-semibold'
						)}
					>
						Log In
					</span>
				</li>

				<li className='mb-5 mr-1 flex w-full' onClick={this.props.viewRegister}>
					<span
						className={classnames(
							this.props.registerStyle,
							'cursor-pointer text-center lex w-full bg-white inline-block py-2 px-4 text-blue-800 font-semibold'
						)}
					>
						Sign Up
					</span>
				</li>
			</ul>
		);
	}
}

export default FormToggle;
