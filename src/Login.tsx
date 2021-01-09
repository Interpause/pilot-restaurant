import React, { useRef, useState } from "react";
import Head from "next/head";
import { Box, Button, ButtonProps, Dialog, DialogContent, DialogProps, Divider, Grid, Icon, IconButton, InputAdornment, makeStyles, OutlinedInput, TextField, Typography } from "@material-ui/core";
import Link from "./Link";

const useDialogStyles = makeStyles((theme) => ({
	registerLink: {
		position:"absolute",
		bottom:0,
		paddingBottom:theme.spacing(1)
	},
	margin: {
		margin: `${theme.spacing(2)}px 0px`
	}
}));

//<div className="g-signin2" data-onsuccess="onSignIn"></div>
export function LoginRight(){
	const styles = useDialogStyles();
	return <>
		<Typography variant="h4" component="h2">Sign in with</Typography>
		<Box display="flex" flexDirection="column" className={styles.margin}>
		</Box>
	</>;
}

export function LoginLeft({closeDialog}:{closeDialog:()=>void}){
	const styles = useDialogStyles();
	const [showPassword, setShowPassword] = useState(false);
	let formRef = useRef<HTMLFormElement>(null);
	const onSubmit = () => {
		if(formRef.current==null) return console.error("form element missing");
		let data = Object.fromEntries(new FormData(formRef.current).entries());
		console.log(data);
	};
	return <form ref={formRef}>
		<Typography variant="h4" component="h2">Login</Typography>
		<TextField autoFocus required name="username" label="Username" className={styles.margin} fullWidth />
		<TextField required	name="test"	label="Password" className={styles.margin} type={showPassword?"text":"password"} fullWidth
			InputProps={{endAdornment:
				<InputAdornment position="end">
					<IconButton onClick={()=>setShowPassword(!showPassword)} edge="end">
						<Icon>{showPassword?"visibility":"visibility_off"}</Icon>
					</IconButton>
				</InputAdornment>
			}}
		/>
		<Button variant="contained" color="primary" onClick={onSubmit}>Login</Button>
		<Link style={{marginLeft:"1ch"}} href="/user/resetPassword" onClick={closeDialog}>Forgot your password?</Link>
	</form>;
}

export function LoginDialog(props:DialogProps){
	const styles = useDialogStyles();
	return <Dialog {...props}>
		<DialogContent>
			<Grid container justify="space-between">
				<Grid item xs={12} md={5}>
					<LoginLeft closeDialog={props.onClose as ()=>void}/>
				</Grid>
				<Divider orientation="vertical" flexItem/>
				<Grid item xs={12} md={5}>
					<LoginRight/>
					<Link className={styles.registerLink} href="/user/register" variant="body1" onClick={props.onClose as ()=>void}>Or register here!</Link>
				</Grid>
			</Grid>
		</DialogContent>
	</Dialog>;
}

export function LoginButton(props:ButtonProps){
	const [isOpen, setOpen] = useState(false);
	const closeDialog = ()=>setOpen(false);
	return <>
		<Head>
			<script src="https://apis.google.com/js/platform.js" async defer/>
			<meta name="google-signin-client_id" content="248503963505-il6uahot07l6ivinibh2ecmb73n3qafi.apps.googleusercontent.com"/>
		</Head>
		<Button variant="contained" color="secondary" {...props} onClick={()=>setOpen(true)}>Login</Button>
		<LoginDialog open={isOpen} onClose={closeDialog} maxWidth="md" fullWidth/>
	</>;
}