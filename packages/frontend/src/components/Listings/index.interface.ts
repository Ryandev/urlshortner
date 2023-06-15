import type { Immutable } from '../../util/immutable';

export interface IListItem {
    url: string;
    name?: string;
    creationDate?: Date;
    expiryDate?: Date;
}

export interface IListings {
    items: IListItem[];
    onEdit?: (item: Immutable<IListItem>) => void;
    onDelete?: (item: Immutable<IListItem>) => void;
}
