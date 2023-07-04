export interface IListing {
    name: string;
    url: string;
}

function useListings(): IListing[] {
    return [
        {
            name: 'test',
            url: 'https://google.com',
        },
        {
            name: 'test',
            url: 'https://google.com',
        },
        {
            name: 'test',
            url: 'https://google.com',
        },
    ];
}

export default useListings;
