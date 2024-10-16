import { useEffect, useCallback, useState } from "react";

const useDebounce = (func, delay) => {
    const [timeoutId, setTimeoutId] = useState(null);
    const debouncedFunction = useCallback(
        (...args) => {
            if(timeoutId){
                clearTimeout(timeoutId);
            }

            const newTimeoutId = setTimeout(() => {
                func(...args);
            }, delay);
            setTimeoutId(newTimeoutId);
        },[func,delay,timeoutId]
     );

     useEffect(() => {
        return () => {
            if(timeoutId){
                clearTimeout(timeoutId);
            }
        };
     },[timeoutId]);

    return debouncedFunction;
};

export default useDebounce;