import React from 'react';

const FloatingShapes = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Circle 1 */}
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-300/20 blur-3xl animate-float" style={{ animationDelay: '0s' }} />

            {/* Circle 2 */}
            <div className="absolute top-[20%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-blue-300/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

            {/* Circle 3 */}
            <div className="absolute bottom-[-10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-indigo-300/20 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
    );
};

export default FloatingShapes;
