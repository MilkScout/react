import React from 'react';
import parse from 'html-react-parser';
import { sanitize } from 'dompurify';

export interface RawHTMLProps {
  rawHTML: string | undefined;
}

export const RawHTML = ({ rawHTML = '' }: RawHTMLProps) => <>{parse(sanitize(rawHTML))}</>;
