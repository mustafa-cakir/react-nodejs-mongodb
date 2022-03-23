/* eslint-disable */

/**
 * eslint is completely disabled from this file,
 * as it does not fit into latest react syntax
 * more info: https://reactjs.org/docs/error-boundaries.html
 */

import React, { PureComponent } from 'react';
import Alert from '../Alert';

class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    // componentDidCatch(error, info) {
    //     // Log this error to an error reporting service
    // }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <Alert type="error" message="Something went wrong, please refresh the page." />;
        }
        return children;
    }
}

export default ErrorBoundary;
