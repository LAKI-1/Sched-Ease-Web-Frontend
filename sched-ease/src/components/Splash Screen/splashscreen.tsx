import { useState, useEffect, JSX } from 'react';

interface LoadingScreenProps {
    onDone: () => void;
}

const LoadingScreen = ({ onDone }: LoadingScreenProps): JSX.Element => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress: number) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    onDone(); // Call onDone when loading is complete
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onDone]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
            {/* Logo and Loading Text */}
            <div className="mb-8 flex flex-col items-center">
                <div className="text-6xl font-bold mb-2 text-navy-800 relative">
                    <span className="text-indigo-900">S</span>
                    <span className="text-indigo-900">E</span>
                    <span className="absolute bottom-0 right-0 h-4 w-4 bg-green-400 rounded-full animate-pulse"></span>
                </div>
                <div className="text-xl text-indigo-900 font-medium tracking-wide">
                    SCHED EASE
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-green-400 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Loading Text */}
            <div className="mt-4 text-indigo-900 flex items-center">
                <span>Loading</span>
                <span className="flex w-8 justify-start ml-1">
                    <span className="animate-bounce h-1 w-1 bg-green-400 rounded-full mx-px delay-75"></span>
                    <span className="animate-bounce h-1 w-1 bg-green-400 rounded-full mx-px delay-150"></span>
                    <span className="animate-bounce h-1 w-1 bg-green-400 rounded-full mx-px delay-300"></span>
                </span>
            </div>

            {/* Animated Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-16 h-16 rounded-full border-4 border-green-400 opacity-20 animate-ping"></div>
                <div className="absolute bottom-40 right-20 w-8 h-8 rounded-full border-2 border-indigo-900 opacity-20 animate-ping animation-delay-1000"></div>
                <div className="absolute top-1/2 left-3/4 w-12 h-12 rounded-full border-2 border-indigo-900 opacity-10 animate-ping animation-delay-2000"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
