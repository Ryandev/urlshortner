import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Head from 'next/head';
import type { ReactElement } from 'react';
import BaseLayout from '../layouts/BaseLayout';

export const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`,
);

function Index() {
    return (
        <OverviewWrapper>
            <Head>
                <title>Welcome</title>
            </Head>
            <Container
                maxWidth="lg"
                sx={{
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Box textAlign="center">
                    <Typography variant="h2" component="h2" gutterBottom={true}>
                        <Typography color="primary" variant="h2" component="span">
                            URL
                        </Typography>
                        <Typography variant="h2" component="span">
                            Shortner
                        </Typography>
                    </Typography>
                    <Container maxWidth="sm">
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            paragraph={true}
                        >
                            Easy quick links
                        </Typography>
                    </Container>
                    <Box padding={2}>
                        <Link href="/profile/login">
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ marginRight: 1 }}
                            >
                                Login
                            </Button>
                        </Link>
                        <Link href="/profile/register">
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{ marginLeft: 1 }}
                            >
                                Register
                            </Button>
                        </Link>
                    </Box>
                    <Typography textAlign="center" variant="subtitle1">
                        Crafted by{' '}
                        <Link
                            href="https://bloomui.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            BloomUI.com
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </OverviewWrapper>
    );
}

Index.getLayout = function getLayout(page: ReactElement) {
    return <BaseLayout>{page}</BaseLayout>;
};

export default Index;
