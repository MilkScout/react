import React from 'react';
import { DateFormat, formatDate } from '../function';

export interface FormattedDateProps {
  date: string | Date;
  format: DateFormat;
}

export const FormattedDate = React.memo(({ date, format }: FormattedDateProps) => <>{formatDate(date, format)}</>);
