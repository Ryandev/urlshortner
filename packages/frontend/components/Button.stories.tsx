import type { Meta, Story } from '@storybook/react';
import Button from './Button';
import type { IButton } from './Button.interface';

export default {
    component: Button,
    title: 'Button',
} as Meta;

const Template: Story<IButton> = (args: Readonly<IButton>) => <Button {...args} />;

export const Primary = Template.bind({});
const args: IButton = {
    name: '',
};

Primary.args = args;
