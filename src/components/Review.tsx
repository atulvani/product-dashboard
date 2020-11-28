import React, { memo, useContext, useMemo } from 'react';
import { HighlightedString } from './HighlightedString';
import { ReviewType } from '../types';
import { SearchContext } from '../SearchContext';

const EMPTY_ARRAY: string[] = [];

type Props = { review: ReviewType; };

export const Review = memo(({ review }: Props) => {
    const searchString = useContext(SearchContext),
        autorSplitBySearchString = useMemo(() => (
            searchString ? review.author.name.split(searchString) : EMPTY_ARRAY
        ), [searchString, review.author.name]),
        textSplitBySearchString = useMemo(() => (
            searchString ? review.text.split(searchString) : EMPTY_ARRAY
        ), [searchString, review.text]);

    return (
        (!searchString || (autorSplitBySearchString.length > 1) || (textSplitBySearchString.length > 1))
            ? (
                <div className="customer">
                    <div className="customer--info">
                        <img className="customer--avatar" src={review.author.avatar} />
                        <h3 className="customer--name">
                            {
                                (autorSplitBySearchString.length > 1)
                                    ? <HighlightedString parts={autorSplitBySearchString} keyword={searchString} />
                                    : review.author.name
                            }
                        </h3>
                        <small className="customer--position">{review.author.job.title}</small>
                        <small className="customer--company">{review.author.job.company}</small>
                    </div>
                    <blockquote className="customer--quote">
                        {
                            (textSplitBySearchString.length > 1)
                                ? <HighlightedString parts={textSplitBySearchString} keyword={searchString} />
                                : review.text
                        }
                    </blockquote>
                </div>
            )
            : null
    );
});
