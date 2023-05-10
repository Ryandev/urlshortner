import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Head from 'next/head';
import { withLayout } from '../layouts';
import BaseLayout from '../layouts/BaseLayout';

const MainContent = styled(Box)(
    () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`,
);

const TopWrapper = styled(Box)(
    ({ theme }) => `
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
`,
);

const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`,
);

const ButtonSearch = styled(Button)(
    ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`,
);

function Status404() {
    return (
        <>
            <Head>
                <title>Status - 404</title>
            </Head>
            <MainContent>
                <TopWrapper>
                    <Container maxWidth="md">
                        <Box textAlign="center">
                            <img alt="404" height={180} src="/static/images/status/404.svg" />
                            <Typography variant="h2" sx={{ my: 2 }}>
                                The page you were looking for doesn&apos;t exist.
                            </Typography>
                            <Typography
                                variant="h4"
                                color="text.secondary"
                                fontWeight="normal"
                                sx={{ mb: 4 }}
                            >
                                It&apos;s on us, we moved the content to a different page. The
                                search below should help!
                            </Typography>
                        </Box>
                        <Container maxWidth="sm">
                            <Card sx={{ textAlign: 'center', mt: 3, padding: 4 }}>
                                <FormControl variant="outlined" fullWidth>
                                    <OutlinedInputWrapper
                                        type="text"
                                        placeholder="Search terms here..."
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <ButtonSearch variant="contained" size="small">
                                                    Search
                                                </ButtonSearch>
                                            </InputAdornment>
                                        }
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchTwoToneIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Divider sx={{ my: 4 }}>OR</Divider>
                                <Button href="/" variant="outlined">
                                    Go to homepage
                                </Button>
                            </Card>
                        </Container>
                    </Container>
                </TopWrapper>
            </MainContent>
        </>
    );
}

export default withLayout(Status404, BaseLayout);
