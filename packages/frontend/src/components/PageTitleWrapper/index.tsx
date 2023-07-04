import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import type { FC, ReactNode } from 'react';

const PageTitle = styled(Box)(
    ({ theme }) => `
        padding: ${theme.spacing(4)};
`,
);

interface PageTitleWrapperProps {
    children?: ReactNode;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => (
    <PageTitle className="MuiPageTitle-wrapper">
        <Container maxWidth="lg">{children}</Container>
    </PageTitle>
);

export default PageTitleWrapper;
