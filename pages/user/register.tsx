import React, { useRef, useState } from 'react';
import { Container, Grid, Icon, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	form: {
		height:"100%",
		overflow:"hidden",
		marginLeft:"auto",
		marginRight:"auto",
		maxWidth:444,
		"&>*":{
			margin: `${theme.spacing(2)}px 0px`,
		}
	}
}));

export default function Registration() {
	const formRef = useRef<HTMLFormElement>(null);
	const style = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const onSubmit = () => {
		if(formRef.current==null) return console.error("form element missing");
		let data = Object.fromEntries(new FormData(formRef.current).entries());
		console.log(data);
	};

  return <Container maxWidth="md">
		<Typography variant="h3" align="center">Registration</Typography>
		<form ref={formRef} className={style.form}>
		<TextField required name="username" label="Username" fullWidth />
		<TextField required	name="test"	label="Password" type={showPassword?"text":"password"} fullWidth
			InputProps={{endAdornment:
				<InputAdornment position="end">
					<IconButton onClick={()=>setShowPassword(!showPassword)} edge="end">
						<Icon>{showPassword?"visibility":"visibility_off"}</Icon>
					</IconButton>
				</InputAdornment>
			}}
		/>
		</form>
	</Container>;
}
