import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { default as Grid } from '@mui/material/Unstable_Grid2';
import Head from 'next/head';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import Footer from '../../../components/Footer';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import PageHeader from '../../../content/Dashboards/Tasks/PageHeader';

import Listings from '../../../components/Listings';
import UrlForm from '../../../components/UrlForm';
import useListings from '../../../hooks/listings';
import { SideBarLayout, withLayout } from '../../../layouts';
import Modal from '../../../util/Modal';

function DashboardUrls() {
    const allListings = useListings();
    const [searchWord, setSearchWord] = useState('');
    const listings = allListings.filter(
        item => searchWord.length === 0 || item.name.includes(searchWord),
    );

    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchWord(event.target.value);
    };

    return (
        <>
            <Head>
                <title>Tasks Dashboard</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={0}
            >
                <Grid xsOffset={10} xs={2}>
                    <Box p={4}>
                        <Button variant="contained" fullWidth>
                            <Typography>Create URL</Typography>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Container maxWidth="lg">
                <Card variant="outlined">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={0}
                    >
                        <Grid xs={8}>
                            <Box p={4}>
                                <Typography variant="h3">
                                    All ({allListings.length})
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid xs={4}>
                            <Box p={4}>
                                <TextField
                                    label="Search"
                                    variant="standard"
                                    fullWidth
                                    onChange={onTextChange}
                                />
                            </Box>
                        </Grid>
                        <Listings items={listings} />
                    </Grid>
                </Card>
            </Container>
            <Footer />
            <Modal isOpen={true}>
                <UrlForm
                    onSubmit={(url, name, expiry) => {
                        // eslint-disable-next-line no-console
                        console.log(
                            `Submitted request to ${String(url)},${name},${String(
                                expiry ?? '',
                            )}`,
                        );
                    }}
                />
            </Modal>
        </>
    );
}

export default withLayout(DashboardUrls, SideBarLayout);
