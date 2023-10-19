import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import numeral from 'numeral';
import type { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import Label from '../../../components/Label';
import type { CryptoOrder, CryptoOrderStatus } from '../../../models/crypto_order';
import BulkActions from './BulkActions';

interface RecentOrdersTableProps {
    className?: string;
    cryptoOrders: CryptoOrder[];
}

interface Filters {
    status: CryptoOrderStatus | null;
}

const formatCurrency = (amount: number, currency: string): string =>
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
    String(numeral(amount).format(`${currency}0,0.00`));

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
    const map: Record<
        CryptoOrderStatus,
        {
            text: 'Completed' | 'Failed' | 'Pending';
            color: 'error' | 'success' | 'warning';
        }
    > = {
        failed: {
            text: 'Failed',
            color: 'error',
        },
        completed: {
            text: 'Completed',
            color: 'success',
        },
        pending: {
            text: 'Pending',
            color: 'warning',
        },
    };

    const { text, color } = map[cryptoOrderStatus];

    return <Label color={color}>{text}</Label>;
};

const applyFilters = (cryptoOrders: CryptoOrder[], filters: Filters): CryptoOrder[] =>
    cryptoOrders.filter(cryptoOrder => {
        let matches = true;

        if (filters.status && cryptoOrder.status !== filters.status) {
            matches = false;
        }

        return matches;
    });

const applyPagination = (
    cryptoOrders: CryptoOrder[],
    page: number,
    limit: number,
): CryptoOrder[] => cryptoOrders.slice(page * limit, page * limit + limit);

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
    const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>([]);
    const selectedBulkActions = selectedCryptoOrders.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [filters, setFilters] = useState<Filters>({
        status: null,
    });

    const statusOptions = [
        {
            id: 'all',
            name: 'All',
        },
        {
            id: 'completed',
            name: 'Completed',
        },
        {
            id: 'pending',
            name: 'Pending',
        },
        {
            id: 'failed',
            name: 'Failed',
        },
    ];

    const handleStatusChange = (
        event: SelectChangeEvent<'all' | 'completed' | 'failed' | 'pending'>,
    ): void => {
        let value: CryptoOrderStatus | null = null;

        if (event.target.value !== 'all') {
            value = event.target.value as CryptoOrderStatus;
        }

        setFilters(prevFilters => ({
            ...prevFilters,
            status: value,
        }));
    };

    const handleSelectAllCryptoOrders = (event: ChangeEvent<HTMLInputElement>): void => {
        setSelectedCryptoOrders(
            event.target.checked ? cryptoOrders.map(cryptoOrder => cryptoOrder.id) : [],
        );
    };

    const handleSelectOneCryptoOrder = (
        _event: ChangeEvent<HTMLInputElement>,
        cryptoOrderId: string,
    ): void => {
        if (selectedCryptoOrders.includes(cryptoOrderId)) {
            setSelectedCryptoOrders(prevSelected =>
                prevSelected.filter(id => id !== cryptoOrderId),
            );
        } else {
            setSelectedCryptoOrders(prevSelected => [...prevSelected, cryptoOrderId]);
        }
    };

    const handlePageChange = (_event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value, 10));
    };

    const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
    const paginatedCryptoOrders = applyPagination(filteredCryptoOrders, page, limit);
    const selectedSomeCryptoOrders =
        selectedCryptoOrders.length > 0 &&
        selectedCryptoOrders.length < cryptoOrders.length;
    const selectedAllCryptoOrders = selectedCryptoOrders.length === cryptoOrders.length;
    const theme = useTheme();

    return (
        <Card>
            {selectedBulkActions && (
                <Box flex={1} p={2}>
                    <BulkActions />
                </Box>
            )}
            {!selectedBulkActions && (
                <CardHeader
                    action={
                        <Box width={150}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={filters.status ?? 'all'}
                                    onChange={handleStatusChange}
                                    label="Status"
                                    autoWidth
                                >
                                    {statusOptions.map(statusOption => (
                                        <MenuItem
                                            key={statusOption.id}
                                            value={statusOption.id}
                                        >
                                            {statusOption.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    }
                    title="Recent Orders"
                />
            )}
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={selectedAllCryptoOrders}
                                    indeterminate={selectedSomeCryptoOrders}
                                    onChange={handleSelectAllCryptoOrders}
                                />
                            </TableCell>
                            <TableCell>Order Details</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCryptoOrders.map(cryptoOrder => {
                            const isCryptoOrderSelected = selectedCryptoOrders.includes(
                                cryptoOrder.id,
                            );
                            return (
                                <TableRow
                                    hover
                                    key={cryptoOrder.id}
                                    selected={isCryptoOrderSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isCryptoOrderSelected}
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>,
                                            ) => {
                                                handleSelectOneCryptoOrder(
                                                    event,
                                                    cryptoOrder.id,
                                                );
                                            }}
                                            value={isCryptoOrderSelected}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {cryptoOrder.orderDetails}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            noWrap
                                        >
                                            {format(cryptoOrder.orderDate, 'MMMM dd yyyy')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {cryptoOrder.orderID}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {cryptoOrder.sourceName}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            noWrap
                                        >
                                            {cryptoOrder.sourceDesc}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {cryptoOrder.amountCrypto}
                                            {cryptoOrder.cryptoCurrency}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            noWrap
                                        >
                                            {formatCurrency(
                                                cryptoOrder.amount,
                                                cryptoOrder.currency,
                                            )}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        {getStatusLabel(cryptoOrder.status)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit Order" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background:
                                                            theme.colors.primary.lighter,
                                                    },
                                                    color: theme.palette.primary.main,
                                                }}
                                                color="inherit"
                                                size="small"
                                            >
                                                <EditTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Order" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background:
                                                            theme.colors.error.lighter,
                                                    },
                                                    color: theme.palette.error.main,
                                                }}
                                                color="inherit"
                                                size="small"
                                            >
                                                <DeleteTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box p={2}>
                <TablePagination
                    component="div"
                    count={filteredCryptoOrders.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                />
            </Box>
        </Card>
    );
};

export default RecentOrdersTable;
