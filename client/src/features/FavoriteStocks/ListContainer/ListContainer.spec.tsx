import React from 'react';
import { render } from '../../../app/testWrapper';
import ListContainer from './index';

describe('Favorite Stocks List Contianer Component', () => {
    it('should render list container component without any error', () => {
        render(<ListContainer />);
    });
});
