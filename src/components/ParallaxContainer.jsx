import React, { useRef, useEffect } from 'react';

export default function ParallaxContainer({ children, strength = 0.3 }) {
    const ref = useRef();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onScroll = () => {
            const y = window.scrollY;
            el.style.transform = `translateY(${y * strength}px)`;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [strength]);

    return <div ref={ref} className="will-change-transform">{children}</div>;
}

