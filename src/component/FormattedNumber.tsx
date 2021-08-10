import React from 'react';
import { formatNumber } from '../function';

export interface FormattedNumberProps {
  number: number;
  locale: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export const FormattedNumber = React.memo(
  ({ number, minimumFractionDigits = 2, maximumFractionDigits = 2, locale }: FormattedNumberProps) => (
    <>{formatNumber(locale, number, minimumFractionDigits, maximumFractionDigits)}</>
  ),
);
