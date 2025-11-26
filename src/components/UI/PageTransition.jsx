import React, { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../../styles/page-transitions.css';

export default function PageTransition({ children, locationKey }) {
    const nodeRef = useRef(null);

    return (
        <SwitchTransition mode="out-in">
            <CSSTransition
                key={locationKey}
                classNames="fade-scale"
                timeout={300}
                nodeRef={nodeRef}
                unmountOnExit
            >
                <div ref={nodeRef} className="page-transition-wrapper">
                    {children}
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
}
