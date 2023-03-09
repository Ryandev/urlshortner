import type { Meta, Story } from '@storybook/react';
import SideMenu from './SideMenu';
import type { ISideMenu } from './SideMenu.interface';

export default {
    component: SideMenu,
    title: 'SideMenu',
} as Meta;

const Template: Story<ISideMenu> = args => <SideMenu {...args} />;

export const Primary = Template.bind({});
const args: ISideMenu = {
    isOpen: false,
    toggleOpen: () => {
        /* No-Op */
    },
};

Primary.args = args;
