import React, { memo } from 'react';

type Props = { className?: string; };

export const LoadingIndicator = memo((props: Props) => (
    <div className={props.className}>(Loading...)</div>
));
