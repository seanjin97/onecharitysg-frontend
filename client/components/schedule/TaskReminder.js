import Alert from '@material-ui/lab/Alert';

export default function TaskReminder({ data = '' }) {
	const test = ['testing', 'tester'];
	const beneList = data
		.map((item) => item.beneficiaryID_beneficiaryID)
		.toString();
	return <Alert severity='error'>{beneList} are low on stocks!</Alert>;
}
