import React, { useEffect, useState } from 'react';
import { ICompany, IError } from '../../../app/types';
import { GET_STOCK_COMPANY_BY_SYMBOL } from '../../../common/constants/apis';
import Alert from '../../../common/components/Alert';
import Shimmer from '../../../common/components/Shimmer';
import ShimmerItem from '../../../common/components/Shimmer/ShimmerItem';
import FetchIEX from '../../../common/FetchIEX';
import './Style.scss';

type Prop = {
    symbol: string;
};

const CompanyDetails = ({ symbol }: Prop) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState<ICompany | null>(null);

    useEffect(() => {
        FetchIEX(GET_STOCK_COMPANY_BY_SYMBOL.replace('{symbol}', symbol)).then(
            (res: ICompany) => {
                setIsLoading(false);
                setCompany(res);
            },
            (err: IError) => {
                setIsLoading(false);
                setError(err?.message || 'Opps there seems to be an error. Please try again.');
            },
        );
    }, [symbol]);

    return (
        <div className="company-details-modal-inner" data-testid="company-details-modal">
            {error && <Alert type="error" message={error} />}
            {isLoading && (
                <Shimmer>
                    <ShimmerItem height={20} width="50%" marginBottom={15} />
                    <ShimmerItem height={20} width="50%" marginBottom={15} />
                    <ShimmerItem height={20} width="50%" marginBottom={15} />
                    <ShimmerItem height={20} width="75%" marginBottom={15} />
                    <ShimmerItem height={20} width="75%" marginBottom={15} />
                    <ShimmerItem height={20} width="75%" marginBottom={15} />
                </Shimmer>
            )}
            {company && (
                <>
                    <h2 data-testid="company-title">
                        {company.companyName} - {company.symbol}
                    </h2>
                    <p>{company.description}</p>
                    <hr />
                    <div className="ui-mb-10">
                        <span className="ui-text-muted">CEO:</span> {company.CEO}
                    </div>
                    <div className="ui-mb-10">
                        <span className="ui-text-muted">Employees:</span> {company.employees}
                    </div>
                    <div className="ui-mb-10">
                        <span className="ui-text-muted">Exchange:</span> {company.exchange}
                    </div>
                    <div className="ui-mb-10">
                        <span className="ui-text-muted">Industry:</span> {company.industry}
                    </div>
                    <div className="ui-mb-10">
                        <span className="ui-text-muted">Sector:</span> {company.sector}
                    </div>
                    <div className="ui-mb-10">
                        <span className="ui-text-muted">Website:</span> {company.website}
                    </div>
                    <div className="ui-mb-10">
                        <span className="ui-text-muted">Address:</span> {company.address} {company.city} /{' '}
                        {company.state} {company.zip} {company.country}
                    </div>
                </>
            )}
            {!error && !isLoading && !company && (
                <div className="ui-text-muted" data-testid="empty-state">
                    Company details are not found.
                </div>
            )}
        </div>
    );
};

export default CompanyDetails;
