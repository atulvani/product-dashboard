import React, { memo, useEffect, useState } from 'react';
import { GenericError } from './components/GenericError';
import { LoadingIndicator } from './components/LoadingIndicator';
import { Product } from './components/Product';
import { Search } from './components/Search';
import { ProductSummaryType } from './types';
import { SearchContext } from './SearchContext';

export const App = memo(() => {
    const [isLoadingProducts, setIsLoadingProducts] = useState(false),
        [hasProductsLoadingErrored, setHasProductsLoadingErrored] = useState(false),
        [products, setProducts] = useState<ProductSummaryType[]>([]),
        [searchString, setSearchString] = useState('');

    useEffect(() => {
        setIsLoadingProducts(true);

        fetch('http://localhost:9000/products')
            .then(res => res.json())
            .then(json => setProducts(json))
            .catch(() => setHasProductsLoadingErrored(true))
            .finally(() => setIsLoadingProducts(false));
    }, []);

    let productView;
    if (isLoadingProducts) {
        productView = <LoadingIndicator className="product-loader" />;
    } else if (hasProductsLoadingErrored) {
        productView = <GenericError className="error" />;
    } else {
        productView = (
            <section id="products-container" className="products">
                {products.map((product) => <Product key={product.id} product={product} />)}
            </section>
        );
    }

    return (
        <SearchContext.Provider value={searchString}>
            <div className="App">
                <Search onChange={setSearchString} />
                {productView}
            </div>
        </SearchContext.Provider>
    );
})
