import React from "react";
import { useRouter } from "next/router";
import Link from "./Link";

import { Typography, makeStyles, Hidden, Box, ButtonGroup } from "@material-ui/core";
import { AppBar, Button, Icon, Toolbar, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { LazyImage } from "./LazyImage";
import { LoginButton } from "./Login";

export interface RouteProps {
	/** display name of route on buttons, links, etc */
	name:string,
	/** relative or absolute URL e.g. /login */
	url:string,
	/** Material Icons Font Ligature */
	icon:string
}

export interface NavProps {
	routes:RouteProps[]
}

const useTopStyles = makeStyles((theme) => ({
	navbar: {
		marginBottom: theme.spacing(2)
	},
	logo: {
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(-1),
		minHeight: "inherit",
		height: 0,
	},
	title: {
		marginRight: theme.spacing(4),
	},
	navBtnRoot: {
		"&:hover":{ textDecoration: "none" },
	}
}));

const useBottomStyles = makeStyles((theme) => ({
	navbar: {
		position: "fixed",
		bottom: 0,
		width: "100%",
	},
	navBtnRoot: {
		color: theme.palette.text.secondary,
		"&:hover":{ textDecoration: "none" },
	}
}));

export function TopNav({routes}:NavProps){
	const style = useTopStyles();
	const router = useRouter();

	return <AppBar position="sticky" className={style.navbar}>
		<Toolbar>
			<LazyImage className={style.logo} src="/logo.png" aspectRatio="1 1"/>
			<Typography className={style.title} variant="h6">Egg'O</Typography>
			<Hidden smDown>
				<ButtonGroup variant="text" color="inherit">
					{routes.map(route => 
						<Button 
							component={Link}
							href={route.url}
							classes={{root:style.navBtnRoot}}
							startIcon={<Icon>{route.icon}</Icon>}
							disabled={router.pathname==route.url}
							key={route.name}
						>
							{route.name}
						</Button>
					)}
				</ButtonGroup>
			</Hidden>
			<Box flexGrow={1}/>
			<LoginButton/>
		</Toolbar>
	</AppBar>;
}

export function BottomNav({routes}:NavProps){
	const style = useBottomStyles();
	const router = useRouter();

	return <Hidden mdUp>
		<BottomNavigation value={router.pathname} className={style.navbar} showLabels>
			{routes.map(route => 
				<BottomNavigationAction 
					component={Link}
					href={route.url}
					classes={{root:style.navBtnRoot}}
					icon={<Icon>{route.icon}</Icon>}
					label={route.name}
					value={route.url}
					key={route.name}
				/>
			)}
		</BottomNavigation>
	</Hidden>;
}