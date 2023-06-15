export type CryptoOrderStatus = 'completed' | 'failed' | 'pending';

export interface CryptoOrder {
    id: string;
    status: CryptoOrderStatus;
    orderDetails: string;
    orderDate: number;
    orderID: string;
    sourceName: string;
    sourceDesc: string;
    amountCrypto: number;
    amount: number;
    cryptoCurrency: string;
    currency: string;
}
