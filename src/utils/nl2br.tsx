import { ReactNode } from 'react';

export const nl2br = (text: string): ReactNode[] =>
  text
    .split('\n')
    .flatMap((line, index) => [line, <br key={index} />])
    .slice(0, -1);
