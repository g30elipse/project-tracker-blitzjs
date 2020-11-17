import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Tooltip, Typography } from '@material-ui/core';
import { Project } from '@prisma/client';
import { Link } from 'blitz';

export interface ProjectCardProps {
    project: Project
    slNumber?: number
}

const ProjectCard: FC<ProjectCardProps> = (props) => {
    const { project, slNumber } = props;
    const classes = useStyles({ active: project.active });
    return (
        <Link href={`/projects/${project.id}`}>
            <Box className={classes.root}>
                <Typography>{slNumber && slNumber >= 0 ? `${slNumber}. ` : ''}{project.name}</Typography>
                <Tooltip title={project.active ? 'active project' : 'inactive project'}>
                    <span className={classes.status} />
                </Tooltip>
            </Box>
        </Link>
    )
}

const useStyles = makeStyles<Theme, { active: boolean }>((theme) => ({
    root: {
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    status: {
        marginLeft: theme.spacing(1),
        backgroundColor: props => props.active ? 'green' : 'gray',
        width: 12,
        height: 12,
        display: 'inline-block',
        borderRadius: 6,
    }
}));

export default ProjectCard;