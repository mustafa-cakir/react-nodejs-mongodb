import React, { useEffect, useState } from 'react';
import './Style.scss';

type Props = {
    isShow?: boolean;
    children?: JSX.Element | JSX.Element[];
};

const WithAnimaation = ({ isShow, children }: Props) => {
    const [isRender, setIsRender] = useState(isShow);

    useEffect(() => {
        if (isShow) setIsRender(true);
    }, [isShow]);

    const onAnimationEnd = () => {
        if (!isShow) setIsRender(false);
    };

    return isRender ? (
        <div
            data-testid="with-animation"
            className="withanimation"
            style={{ animation: isShow ? 'fadeInFromTop .3s' : 'fadeOutFromTop .3s' }}
            onAnimationEnd={onAnimationEnd}
        >
            {children}
        </div>
    ) : null;
};

WithAnimaation.defaultProps = {
    isShow: false,
    children: null,
};

export default WithAnimaation;
