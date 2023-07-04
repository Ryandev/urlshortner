import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { DeepReadonly } from 'ts-essentials';
import type { IListings } from './index.interface';

function ListingHeading(props: DeepReadonly<{ value: string }>): JSX.Element {
    return (
        <TableCell>
            <Typography variant="h5">{props.value}</Typography>
        </TableCell>
    );
}

function ListingCell(
    props: DeepReadonly<{ value: JSX.Element | number | string }>,
): JSX.Element {
    return (
        <TableCell>
            <Typography variant="body1">{props.value}</Typography>
        </TableCell>
    );
}

function Listing(props: DeepReadonly<IListings>): JSX.Element {
    const { items } = props;
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <ListingHeading value={''} />
                    <ListingHeading value={'NAME'} />
                    <ListingHeading value={'URL'} />
                    <ListingHeading value={'CREATION'} />
                    <ListingHeading value={'EXPIRY'} />
                    <ListingHeading value={'ACTIONS'} />
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={item.name}>
                        <ListingCell value={index + 1} />
                        <ListingCell value={item.name ?? 'missing'} />
                        <ListingCell value={<Link>{item.url}</Link>} />
                        <ListingCell value={String(item.creationDate ?? 'missing')} />
                        <ListingCell value={String(item.expiryDate ?? 'missing')} />
                        <TableCell>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                divider={<Divider orientation="vertical" flexItem />}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => props.onEdit?.(item)}
                                >
                                    <Typography>Edit</Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => props.onDelete?.(item)}
                                    color="error"
                                    sx={{ display: 'inline-block' }}
                                >
                                    <Typography>Delete</Typography>
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default Listing;
