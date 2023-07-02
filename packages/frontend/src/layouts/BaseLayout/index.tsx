import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import type { DeepReadonly } from 'ts-essentials';

interface BaseLayoutProps {
    children?: ReactNode;
}

function BaseLayout(props: DeepReadonly<BaseLayoutProps>): JSX.Element {
    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                height: '100%',
            }}
        >
            {props.children}
        </Box>
    );
}

export default BaseLayout;
