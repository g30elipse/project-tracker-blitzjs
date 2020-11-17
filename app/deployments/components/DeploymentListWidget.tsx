import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Card, Divider, Typography } from '@material-ui/core';
import { Link } from 'blitz';
import { Deployment, Environment } from '@prisma/client';
import DeploymentCard, { DeploymentCardProps } from './DeploymentCard';

export interface DeploymentListWidgetProps {
    deployments: Array<DeploymentCardProps['deployment']>
    count?: number
}

const DeploymentListWidget: FC<DeploymentListWidgetProps> = (props) => {
    const classes = useStyles();
    const { deployments, count } = props;
    return (
        <Card className={classes.root}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant='h6'>DEPLOYMENTS</Typography>
                {count ? <Typography variant='caption'>{count} deployment(s)</Typography> : null}
            </Box>
            <Divider />
            <Box py={2} display='flex' flexDirection='column'>
                {deployments.map((d, i) => (
                    <Box key={d.id} my={2}>
                        <DeploymentCard deployment={d} />
                    </Box>
                ))}
            </Box>
            <Link href='/deployments'>
                <Button variant='outlined' color='primary'>ALL DEPLOYMENTS</Button>
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

export default DeploymentListWidget;