import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Card, Divider, Typography } from '@material-ui/core';
import { Environment } from '@prisma/client';
import { Link } from 'blitz';
import Badge from './Badge';

export interface EnvironmentListWidgetProps {
    environments: Environment[]
    count?: number
}

const EnvironmentListWidget: FC<EnvironmentListWidgetProps> = (props) => {
    const classes = useStyles();
    const { environments, count } = props;

    return (
        <Card className={classes.root}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant='h6'>ENVIRONMENTS</Typography>
                {count ? <Typography variant='caption'>{count} environment(s)</Typography> : null}
            </Box>
            <Divider />
            <Box py={2} display='flex'>
                {environments.map((e, i) => (
                    <Box key={e.id} mr={2}>
                        <Badge environment={e} />
                    </Box>
                ))}
            </Box>
            <Link href='/environments'>
                <Button variant='outlined' color='primary'>ALL ENVIRONMENTS</Button>
            </Link>
        </Card>
    )
}

const useStyles = makeStyles<Theme, any>((theme) => ({
    root: {
        padding: theme.spacing(4),
        width: '100%'
    }
}));

export default EnvironmentListWidget;