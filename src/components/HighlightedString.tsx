import React, { Fragment, memo } from 'react';

type Props = {
    parts: string[];
    keyword: string;
};

export const HighlightedString = memo((props: Props) => (
    <>
        {props.parts.map((part, index) => (
            <Fragment key={index}>
                {index !== 0 && <mark>{props.keyword}</mark>}
                <span>{part}</span>
            </Fragment>
        ))}
    </>
));
