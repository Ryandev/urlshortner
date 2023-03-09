import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import type { IListing } from '../hooks/listings';

function Listing({ items }: { items: IListing[] }): JSX.Element {
    <Table size="small">
        <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Sale Amount</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {items.map(row => (
                <TableRow key={row.url}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.url}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>;
}

export default Listing;
