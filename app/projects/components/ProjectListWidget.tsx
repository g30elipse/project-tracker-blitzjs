import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Card, Divider, Typography } from '@material-ui/core';
import { Project } from '@prisma/client';
import ProjectCard from './ProjectCard';
import { Link } from 'blitz';

export interface ProjectListWidgetProps {
    projects: Project[]
    count?: number
}

const ProjectListWidget: FC<ProjectListWidgetProps> = (props) => {
    const classes = useStyles();
    const { projects, count } = props;
    return (
        <Card className={classes.root}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant='h6'>PROJECTS</Typography>
                {count ? <Typography variant='caption'>{count} project(s)</Typography> : null}
            </Box>
            <Divider />
            <Box>
                {projects.map((p, i) => (
                    <ProjectCard slNumber={i + 1} key={p.id} project={p} />
                ))}
            </Box>
            <Link href='/projects'>
                <Button variant='outlined' color='primary'>ALL PROJECTS</Button>
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

export default ProjectListWidget;