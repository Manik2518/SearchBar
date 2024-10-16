import { useCallback, useEffect, useState } from "react"


const useThrottle = (func, delay) => {
    const[lastCallTime, setLastCallTime] = useState(0);

    const throttledFunction = useCallback(
        (...args) => {
            const now = Date.now();
            if(now - lastCallTime >= delay){
                setLastCallTime(now);
                func(...args);
            }
        },
        [func,delay,lastCallTime]
    );

    useEffect(()=>{
        return() => {

        }
    },[]);

    return throttledFunction;
};

export default useThrottle;