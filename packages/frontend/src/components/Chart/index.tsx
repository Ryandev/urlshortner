import type { LoaderComponent } from 'next/dynamic';
import dynamic from 'next/dynamic';
import type { Props } from 'react-apexcharts';

const importCharts = async (): LoaderComponent<Props> => {
    const res = import('react-apexcharts');
    return res;
};

/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
export const Chart = dynamic(importCharts, { ssr: false });
