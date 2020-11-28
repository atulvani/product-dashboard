export type AddressType = {
    street: string;
    city: string;
    zipCode: string;
    country: string;
};

export type JobType = {
    title: string;
    company: string;
};

export type ProductSummaryType = {
    id: string;
    name: string;
    self: string;
    customers: number;
};

export type ProductDetailType = {
    id: string;
    name: string;
    reviews: ReviewType[];
};

export type ReviewAuthorType = {
    name: string;
    email: string;
    username: string;
    avatar: string;
    dateOfBirth: string;
    job: JobType;
    phone: string;
    address: AddressType;
};

export type ReviewType = {
    id: number;
    author: ReviewAuthorType;
    text: string;
};
