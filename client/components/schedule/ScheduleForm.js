import React, { useState, Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
	},
	button: {
		margin: theme.spacing(1),
	},
}));

// class Postt extends Component{
//   async postData(e) {
//     try{
//       e.preventDefault();
//     // prevent page reload everytime form submission is done
//       let result = await fetch( "https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Schedule", {
//         method: 'post',
//         headers: {
//           'Content-Type': 'application/json' },
//           body: JSON.stringify(e)
//         });

//     } catch(e){
//       console.log(e)
//     }
//   }
// }

function Form() {
	const classes = useStyles();
	const [inputFieldsdate, setInputFieldsdate] = useState(null);
	const [inputFieldsStartTime, setInputFieldsStartTime] = useState(null);
	const [
		inputFieldsCharity_charityID,
		setInputFieldsCharity_charityID,
	] = useState(null);
	const [
		inputFieldsParent_scheduleID,
		setInputFieldsParent_scheduleID,
	] = useState(null);
	const [
		inputFieldsVolunteer_userID,
		setInputFieldsVolunteer_userID,
	] = useState(null);
	const [
		inputFieldsBeneficiary_beneficiaryID,
		setInputFieldsBeneficiary_beneficiaryID,
	] = useState(null);
	const [inputFieldsFood_BasketID, setInputFieldsFood_BasketID] = useState(
		null
	);

	const [inputFields, setInputFields] = useState([
		{
			date: '',
			startTime: '',
			charity_charityID: '',
			parent_scheduleID: '',
			volunteer_userID: '',
			beneficiary_beneficiaryID: '',
			Food_BasketID: '',
		},
	]);
	// const [inputFields, setInputFields] = useState([
	//   { date: '',
	//     startTime: '' , charity_charityID:'',
	//     deliverStatus: "NotCompleted",
	//     parent_scheduleID: '',
	//     volunteer_userID: '',
	//     beneficiary_beneficiaryID: '',
	//     Food_BasketID: ""
	//   },
	// ]);

	// const hardcode = {
	//   "date" : "2020-11-08",
	//   "startTime": "9:00 AM",
	//   "charity_charityID" : "charity001",
	//   "Details": [
	//       {
	//           "deliverStatus": "NotCompleted",
	//           "parent_scheduleID": "newtest",
	//           "volunteer_userID" : "user001",
	//           "beneficiary_beneficiaryID" : "bene001",
	//           "Food_BasketID": "01"
	//       }
	//   ]
	// }

	async function handleSubmit(e) {
		// e.preventDefault();
		// prevent page reload everytime form submission is done
		// console.log("InputFields", inputFields);
		console.log('posting');
		const result = await fetch(
			'https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Schedule',
			{
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					date: inputFieldsdate,
					startTime: inputFieldsStartTime,
					charity_charityID: inputFieldsCharity_charityID,
					Details: [
						{
							deliverStatus: 'NotCompleted',
							parent_scheduleID: inputFieldsParent_scheduleID,
							volunteer_userID: inputFieldsVolunteer_userID,
							beneficiary_beneficiaryID: inputFieldsBeneficiary_beneficiaryID,
							Food_BasketID: inputFieldsFood_BasketID,
						},
					],
				}),
			}
		);

		const postresult = await result.json();
		console.log(postresult);
		// console.log(e)
		// } catch(e){
		// console.log(e)
		// }
		try {
			const response = await fetch(
				'https://api-quiet-manatee-cn.cfapps.us10.hana.ondemand.com/sendEmail'
			);
			var data = await response.json();
			// data = data.value;
			console.log(data);
		} catch (error) {
			let data = {};
			console.log('Error fetching odata');
		}
	}

	const handleChangeInput = (index, event) => {
		// const values = [...inputFields];
		// values[index][event.target.name] = event.target.value;
		// setInputFields(values);
		if (event.target.id == 'date') setInputFieldsdate(event.target.value);
		if (event.target.id == 'startTime')
			setInputFieldsStartTime(event.target.value);
		if (event.target.id == 'charityID')
			setInputFieldsCharity_charityID(event.target.value);
		if (event.target.id == 'scheduleID')
			setInputFieldsParent_scheduleID(event.target.value);
		if (event.target.id == 'volunteerID')
			setInputFieldsVolunteer_userID(event.target.value);
		if (event.target.id == 'beneficiaryID')
			setInputFieldsBeneficiary_beneficiaryID(event.target.value);
		if (event.target.id == 'foodID')
			setInputFieldsFood_BasketID(event.target.value);
	};

	const handleAddFields = () => {
		setInputFields([
			...inputFields,
			{
				parent_scheduleID: '',
				volunteer_userID: '',
				beneficiary_beneficiaryID: '',
				Food_BasketID: '',
			},
		]);
	};
	// const handleAddFields = () => {
	//   setInputFields([...inputFields,
	//     // { firstName: '',
	//     // lastName: '',
	//     // volunteer_userID: '',
	//     // beneficiary_beneficiaryID:''
	//     // },
	//     {date: '', startTime: '' , charity_charityID:'', Details:
	//     [
	//       {deliverStatus: "NotCompleted",
	//       parent_scheduleID: '',
	//       volunteer_userID: '',
	//       beneficiary_beneficiaryID: '',
	//       Food_BasketID: ""
	//       }
	//     ]}
	//   ])
	// }
	const handleRemoveFields = (index) => {
		const values = [...inputFields];
		values.splice(index, 1);
		setInputFields(values);
	};
	return (
		<Container>
			<form className={classes.root}>
				{inputFields.map((inputField, index) => (
					<div key={index}>
						<TextField
							id='date'
							name='date'
							label='Date'
							variant='filled'
							// value={inputField.date}
							onChange={(event) => handleChangeInput(index, event)}
						/>
						<TextField
							id='startTime'
							name='startTime'
							label='Start Time'
							variant='filled'
							// value={inputField.startTime}
							onChange={(event) => handleChangeInput(index, event)}
						/>
						<TextField
							id='scheduleID'
							name='charity_charityID'
							label='Charity ID'
							variant='filled'
							// value={inputField.charity_charityID}
							onChange={(event) => handleChangeInput(index, event)}
						/>
						<TextField
							id='scheduleID'
							name='parent_scheduleID'
							label='Schedule ID'
							variant='filled'
							// value={inputField.parent_scheduleID}
							onChange={(event) => handleChangeInput(index, event)}
						/>
						<TextField
							id='volunteerID'
							name='volunteer_userID'
							label='Volunteer ID'
							variant='filled'
							// value={inputField.volunteer_userID}
							onChange={(event) => handleChangeInput(index, event)}
						/>
						<TextField
							id='beneficiaryID'
							name='beneficiary_beneficiaryID'
							label='Beneficiary ID'
							variant='filled'
							// value={inputField.beneficiary_beneficiaryID}
							onChange={(event) => handleChangeInput(index, event)}
						/>
						<TextField
							id='foodID'
							name='Food_BasketID'
							label='Food ID'
							variant='filled'
							// value={inputField.Food_BasketID}
							onChange={(event) => handleChangeInput(index, event)}
						/>

						<IconButton onClick={() => handleRemoveFields(index)}>
							<RemoveIcon />
						</IconButton>
						<IconButton onClick={() => handleAddFields()}>
							<AddIcon />
						</IconButton>
					</div>
				))}
				<Button
					className={classes.button}
					variant='contained'
					color='primary'
					type='submit'
					onClick={handleSubmit}
					// onClick={()=> this.postData(hardcode)}
				>
					Post
				</Button>
			</form>
		</Container>
	);
}

export default Form;
