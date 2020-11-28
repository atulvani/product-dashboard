import React, { memo, useCallback, useContext } from 'react';
import { SearchContext } from '../SearchContext';

type Props = { onChange: (searchString: string) => void };

export const Search = memo((props: Props) => {
    const searchString = useContext(SearchContext),
        onChange = useCallback((e) => props.onChange(e.target.value), [props.onChange]);

    return (
        <div className="search-bar">
            <input
                type="search"
                id="search"
                className="search-bar--search"
                placeholder="Start typing to highlight..."
                value={searchString}
                onChange={onChange}
            />
        </div>
    );
});
