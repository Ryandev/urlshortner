export interface IListing {
    name: string;
    url: string;
}

function useListings(): IListing[] {
    return [
        {
            name: 'test',
            url: 'http://google.com',
        },
        {
            name: 'test',
            url: 'http://google.com',
        },
        {
            name: 'test',
            url: 'http://google.com',
        },
    ];
}

export default useListings;
