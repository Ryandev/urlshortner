export interface IModelLink {
    id: string;
    name: string;
    url: string;
    creationDate: Date;
    modifiedDate: Date;
}

export function Link({ name, url }: Readonly<{ name: string; url: string }>): IModelLink {
    return {
        id: 'asdf',
        name,
        url,
        creationDate: new Date(),
        modifiedDate: new Date(),
    };
}
