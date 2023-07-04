import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Head from 'next/head';
/*
 * Import Footer from '../../components/Footer';
 * import PageTitleWrapper from '../../components/PageTitleWrapper';
 * import PageHeader from '../../content/Dashboards/Tasks/PageHeader';
 */

import Footer from '../../../components/Footer';
import Profile from '../../../content/Dashboards/Tasks/Profile';
import { SideBarLayout, withLayout } from '../../../layouts';

function DashboardTasks() {
    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Container maxWidth="lg" sx={{ padding: 4 }}>
                <Card variant="outlined">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={0}
                    >
                        <Grid item xs={12} md={6}>
                            <Box p={4}>
                                <Profile />
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
            <Footer />
        </>
    );
}

export default withLayout(DashboardTasks, SideBarLayout);
