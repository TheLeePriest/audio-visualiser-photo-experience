import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './AppWrapperStyled';

const AppWrapper = ({ children }) => (
    <Wrapper>
        {children}
    </Wrapper>
);

AppWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppWrapper;
