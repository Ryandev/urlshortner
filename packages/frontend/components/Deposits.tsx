import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { MouseEvent } from 'react';
import { Fragment } from 'react';
import Title from './Title';

function preventDefault(event: MouseEvent) {
    event.preventDefault();
}

export default function Deposits() {
    return (
        <Fragment>
            <Title>Recent Deposits</Title>
            <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 15 March, 2019
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View balance
                </Link>
            </div>
        </Fragment>
    );
}
