import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography, Link as MuiLink } from '@material-ui/core';
import { Link } from "blitz"
import { Deployment, DeploymentInclude, Environment, Project } from '@prisma/client';
import Badge from 'app/environments/components/Badge';

export interface DeploymentCardProps {
    deployment: Deployment & { environment: Environment, project: Project | null }
}

const DeploymentCard: FC<DeploymentCardProps> = (props) => {
    const { deployment } = props;
    const classes = useStyles({ active: deployment.project?.active || false, color: deployment.project?.color || '#00000000' });
    return (
        <Box display='flex' alignItems='center'>
            <Box className={classes.title} flex={2}>
                <Link href={`/deployments/${deployment.id}`}>
                    <Typography variant='subtitle1'>{deployment.project?.name}</Typography>
                </Link>
            </Box>
            <Box flex={1}>
                <Typography className={classes.status} variant='subtitle1'>{deployment.project?.active ? 'Active' : 'Inactive'}</Typography>
            </Box>
            <Box flex={2}>
                <MuiLink href={deployment.url}>{deployment.url}</MuiLink>
            </Box>
            <Box flex={1}>
                {deployment.environment ? (
                    <Box ml={1}>
                        <Badge environment={deployment.environment} />
                    </Box>
                ) : null}
            </Box>
        </Box>
    )
}

const useStyles = makeStyles<Theme, { active: boolean, color: string }>((theme) => ({
    title: {
        cursor: 'pointer',
        paddingLeft: 4,
        borderLeft: props => props.active ? `5px solid ${props.color}` : 'none'
    },
    status: {
        marginRight: theme.spacing(4),
        color: props => props.active ? 'green' : 'gray'
    }
}));

export default DeploymentCard;