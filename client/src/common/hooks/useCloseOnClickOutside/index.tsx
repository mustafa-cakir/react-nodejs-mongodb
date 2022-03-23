import React, { useState, useEffect, useRef } from 'react';

const useVisibleOnClick = (
    initialIsVisible = false,
): [React.MutableRefObject<HTMLDivElement | null>, boolean, (arg0: boolean) => void] => {
    const [isVisible, setIsVisible] = useState<boolean>(initialIsVisible);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (ref?.current && !ref.current.contains(event?.target as HTMLElement)) {
                setIsVisible(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return [ref, isVisible, setIsVisible];
};

export default useVisibleOnClick;
