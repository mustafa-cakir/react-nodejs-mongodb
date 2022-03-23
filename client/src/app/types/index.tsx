export type IFavStockItem = string;

export type ITheme = 'dark' | 'light';

export type IListingType = 'table' | 'grid';

export type IUser = {
    listingType: IListingType;
    theme: ITheme;
    favStocks: IFavStockItem[];
};

export type IRoute = {
    Component: () => JSX.Element;
    path: string;
};

export type IRoutes = IRoute[];

export type ICompany = {
    symbol: string;
    companyName: null | string;
    exchange: null | string;
    industry: null | string;
    website: null | string;
    description: null | string;
    CEO: null | string;
    securityName: null | string;
    issueType: null | string;
    sector: null | string;
    primarySicCode: null | number;
    employees: null | number;
    tags: null | string[];
    address: null | string;
    address2: null | string;
    state: null | string;
    city: null | string;
    zip: null | string;
    country: null | string;
    phone: null | string;
};

export type IQuote = {
    symbol: string;
    companyName: string;
    changePercent: number;
    latestPrice: number;
    currency: string;
};

export type ISearch = {
    quote: null | IQuote;
    isLoading: boolean;
    error: null | string;
};

export type IFavoriteStocks = {
    quotes: IQuote[];
    isLoading: boolean;
    error: null | string;
};

export type IError = null | {
    message?: string;
};
