import React, { memo } from 'react';

type Props = { className?: string; };

export const GenericError = memo((props: Props) => (
    <div className={props.className}>Something went wrong! Please try again later.</div>
));
