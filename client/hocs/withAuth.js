import withAuthRedirect from './withAuthRedirect';

// redirect to href if not authenticated
export default function withAuth(WrappedComponent, location = '/front') {
	return withAuthRedirect({
		WrappedComponent,
		location,
		expectedAuth: false,
	});
}
