import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, darken, Typography } from '@material-ui/core';
import { Environment } from '@prisma/client';

export interface BadgeProps {
    environment: Environment
}

const Badge: FC<BadgeProps> = (props) => {
    const classes = useStyles({ color: props.environment.color });
    return (
        <span className={classes.root}>
            <Typography color='inherit' variant='caption'>{props.environment.name.toUpperCase()}</Typography>
        </span>
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