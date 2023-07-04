const config = {
    stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: ['@storybook/addon-essentials'],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
};

export default config;
