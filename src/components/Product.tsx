import React, { memo, useCallback, useEffect, useState } from 'react';
import { GenericError } from './GenericError';
import { LoadingIndicator } from './LoadingIndicator';
import { Review } from './Review';
import { ProductSummaryType, ReviewAuthorType, ReviewType } from '../types';

const THIRTY_SECONDS_IN_MS = 30 * 1000;

type Props = { product: ProductSummaryType; };

export const Product = memo(({ product }: Props) => {
    const [isLoadingProduct, setIsLoadingProduct] = useState(false),
        [hasProductLoadingErrored, setHasProductLoadingErrored] = useState(false),
        [reviews, setReviews] = useState<ReviewType[]>([]);

    const fetchProduct = useCallback(() => {
        setIsLoadingProduct(true);

        fetch(`http://localhost:9000/products/${product.id}`)
            .then(res => res.json())
            .then(({ customers }: { customers: Array<ReviewAuthorType & { id: number; quote: string; }> }) => {
                setReviews(customers.map(({ id, quote, ...author}) => ({ id, author, text: quote })))
            })
            .catch(() => setHasProductLoadingErrored(true))
            .finally(() => setIsLoadingProduct(false));
    }, [product.id]);

    useEffect(() => {
        fetchProduct();
        const intervalId = setInterval(fetchProduct, THIRTY_SECONDS_IN_MS);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <article className="product">
            <h2 className="product--name">
                {product.name}
                {isLoadingProduct && <LoadingIndicator className="review-loader" />}
            </h2>
            {
                hasProductLoadingErrored
                    ? <GenericError className="error" />
                    : (
                        <ul className="customers">
                            {reviews.map((review) => <li key={review.id}><Review review={review} /></li>)}
                        </ul>
                    )
            }
        </article>
    );
});
