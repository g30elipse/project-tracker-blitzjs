import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { usePaginatedQuery } from 'blitz';
import getProjects from 'app/projects/queries/getProjects';
import ProjectListWidget from 'app/projects/components/ProjectListWidget';
import EnvironmentListWidget from 'app/environments/components/EnvironmentListWidget';
import getEnvironments from 'app/environments/queries/getEnvironments';
import DeploymentListWidget from 'app/deployments/components/DeploymentListWidget';
import getDeployments from 'app/deployments/queries/getDeployments';

export interface LandingProps {

}

const Landing: FC<LandingProps> = (props) => {
    const classes = useStyles();
    const [{ projects, count: projectCount }] = usePaginatedQuery(getProjects, {
        take: 10
    })
    const [{ environments, count: envCount }] = usePaginatedQuery(getEnvironments, {
        take: 10
    })
    const [{ deployments, count: deploymentCount }] = usePaginatedQuery(getDeployments, {
        take: 10
    })

    return (
        <Box maxWidth='1200px' mx='auto' py={10}>
            <Grid container spacing={8}>
                <Grid item md={7}>
                    <ProjectListWidget count={projectCount} projects={projects} />
                </Grid>
                <Grid item md={5}>
                    <EnvironmentListWidget count={envCount} environments={environments} />
                </Grid>
                <Grid item md={12}>
                    <DeploymentListWidget deployments={deployments} count={deploymentCount} />
                </Grid>
            </Grid>
        </Box>
    )
}

const useStyles = makeStyles<Theme, any>((theme) => ({

}));

export default Landing;