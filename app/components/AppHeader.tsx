import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useMutation } from 'blitz';
import logout from 'app/auth/mutations/logout';
import { useCurrentUser } from 'app/hooks/useCurrentUser';

export interface AppHeaderProps {

}

const AppHeader: FC<AppHeaderProps> = (props) => {
    const classes = useStyles();
    const [logoutMutation] = useMutation(logout)
    const currentUser = useCurrentUser();

    return (
        <AppBar position='sticky'>
            <Link href='/'>
                <Toolbar>
                    <Typography>HOME</Typography>
                    <Box flex={1} />
                    {currentUser ? (
                        <Button onClick={async () => await logoutMutation()} variant='contained' color='secondary'>
                            LOGOUT
                        </Button>
                    ) : null}
                </Toolbar>
            </Link>
        </AppBar>
    )
}

const useStyles = makeStyles<Theme, any>((theme) => ({

}));

export default AppHeader;