import React, { ReactNode, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyLoadProps {
    children: ReactNode;
    fallback: ReactNode;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ children, fallback }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '200px 0px', // Start loading when the component is 200px away from the viewport
    });

    return (
        <div ref={ref} style={{ minHeight: '1px' }}>
            {inView ? (
                <Suspense fallback={fallback}>
                    <div className="animate-fade-in ease-out duration-700">
                        {children}
                    </div>
                </Suspense>
            ) : (
                fallback
            )}
        </div>
    );
};

export default LazyLoad;
