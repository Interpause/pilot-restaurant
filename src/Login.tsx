import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Box, Button, ButtonProps, Dialog, DialogContent, DialogProps, Divider, FormHelperText, Grid, Icon, IconButton, InputAdornment, makeStyles, OutlinedInput, TextField, Typography } from "@material-ui/core";
import Link from "./Link";
import { signIn, useSession, SessionProvider } from "next-auth/client";
import axios from "axios";

const useDialogStyles = makeStyles((theme) => ({
	form: {
		height:"100%",
		overflow:"hidden",
		"&>*":{
			margin: `${theme.spacing(2)}px 0px`,
		}
	}
}));

const DialogContext = createContext(()=>console.error("DialogClose function not provided!"));

//<div className="g-signin2" data-onsuccess="onSignIn"></div>
export function LoginRight(){
	const closeDialog = useContext(DialogContext);
	const styles = useDialogStyles();
	const [ providers, setProviders ] = useState<{}>();
	useEffect(() => {
		(async ()=> {
			const { data } = await axios.get("/api/auth/providers");
			setProviders(data);
		})();
	});
	return <Box display="flex" flexDirection="column" className={styles.form}>
		<Typography variant="h4" component="h2">Sign in with</Typography>
		{Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
    ))}
		<Box flexGrow={1}/>
		<Link href="/user/register" variant="body1" onClick={closeDialog}>Or register here!</Link>
	</Box>;
}

export function LoginLeft(){
	const closeDialog = useContext(DialogContext);
	const styles = useDialogStyles();
	const [showPassword, setShowPassword] = useState(false);
	let formRef = useRef<HTMLFormElement>(null);
	const onSubmit = () => {
		if(formRef.current==null) return console.error("form element missing");
		let data = Object.fromEntries(new FormData(formRef.current).entries());
		signIn('credentials', data);
	};
	return <form ref={formRef} className={styles.form}>
		<Typography variant="h4" component="h2">Login</Typography>
		<TextField required name="username" label="Username" fullWidth />
		<TextField required	name="password"	label="Password" type={showPassword?"text":"password"} fullWidth
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
	return <Dialog {...props}>
		<DialogContent>
			<Grid container justify="space-between">
				<Grid item xs={12} md={5}>
					<LoginLeft/>
				</Grid>
				<Divider orientation="vertical" flexItem/>
				<Grid item xs={12} md={5}>
					<LoginRight/>
				</Grid>
			</Grid>
		</DialogContent>
	</Dialog>;
}

export function LoginButton(props:ButtonProps){
	const [ session, ] = useSession();
	const [isOpen, setOpen] = useState(false);
	const closeDialog = ()=>setOpen(false);
	if(session) return <></>;
	return <>
		<Button variant="contained" color="secondary" {...props} onClick={()=>setOpen(true)}>Login</Button>
		<DialogContext.Provider value={closeDialog}>
			<LoginDialog open={isOpen} onClose={closeDialog} maxWidth="md" fullWidth/>
		</DialogContext.Provider>
	</>;
}