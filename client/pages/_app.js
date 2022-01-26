import React from 'react';
import App from 'next/app';
import { AuthProvider } from '../providers/Auth';
import '../styles/globals.css';
import '../styles/schedule.css';

// override default initialization of each page
class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		);
	}
}

export default MyApp;
