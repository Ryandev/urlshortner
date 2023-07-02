import { render } from '@testing-library/react';

import Index from '../src/pages/index';

describe('App', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Index />);
        const es: HTMLElement | undefined = baseElement;
        expect(es).not.toBeFalsy();
    });
});
