import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, darken, Typography } from '@material-ui/core';
import { Environment } from '@prisma/client';
import { Link } from 'blitz';

export interface BadgeProps {
    environment: Environment
}

const Badge: FC<BadgeProps> = (props) => {
    const { environment } = props;
    const classes = useStyles({ color: environment.color });
    return (
        <Link href={`/environments/${environment.id}/edit`}>
            <span className={classes.root}>
                <Typography color='inherit' variant='caption'>{environment.name.toUpperCase()}</Typography>
            </span>
        </Link>
    )
}

const useStyles = makeStyles<Theme, { color: string }>((theme) => ({
    root: {
        padding: theme.spacing(0.5, 1.5),
        borderRadius: 16,
        backgroundColor: props => props.color,
        color: props => darken(props.color, 0.5)
    }
}));

export default Badge;