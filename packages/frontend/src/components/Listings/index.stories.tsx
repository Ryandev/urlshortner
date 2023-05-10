import type { Meta, Story } from '@storybook/react';
import type { Immutable } from '../util/immutable';
import Listings from './index';
import type { IListings } from './index.interface';

export default {
    component: Listings,
    title: 'Listing',
} as Meta;

const Template: Story<IListings> = (args: Immutable<IListings>) => <Listings {...args} />;

export const Primary = Template.bind({});
const args: IListings = {
    items: [
        {
            name: 'Hello',
            url: 'http://foo.com',
            expiryDate: new Date(),
        },
        {
            name: 'World',
            url: 'http://bar.com',
            expiryDate: new Date(),
        },
    ],
    onEdit: item => {
        /* eslint-disable-next-line no-console */
        console.log(`Edit requested for: ${item.name}`);
    },
    onDelete: item => {
        /* eslint-disable-next-line no-console */
        console.log(`Delete requested for: ${item.name}`);
    },
};

Primary.args = args;
