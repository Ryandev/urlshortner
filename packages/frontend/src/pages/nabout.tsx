import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import { BaseLayout, withLayout } from '../layouts';

function About() {
    return (
        <Box>
            <Head>
                <title>Tokyo Free Black NextJS Typescript Admin Dashboard</title>
            </Head>
            <Container maxWidth="lg" sx={{ mt: 8 }}>
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
            </Container>
        </Box>
    );
}

export default withLayout(About, BaseLayout);
