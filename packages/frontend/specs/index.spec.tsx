import { render } from '@testing-library/react';

import Index from '../pages/index';

describe('Index', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Index />);
        const es: HTMLElement | undefined = baseElement;
        expect(es).not.toBeFalsy();
    });
});
