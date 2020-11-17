import { get } from 'lodash';
import { useState } from 'react';

type TStatus = 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';


/**
 * A hook for async functions
 * 
 * Returns a handler with method: run and property: status
 * 
 * example:
 * ```ts
    const submitHandler = useAsyncTask(async () => {
        // Your async function goes here
    });

    // to use the handler
    submitHandler.run();

    // Its has 4 status: IDLE, PROCESSING, ERROR, SUCCESS
    if(submitHandler.status === 'PROCESSING')
        return loader()
 * ```
 */
function useAsyncTask<T>(task: (arg: T) => Promise<any>) {

    const [status, setStatus] = useState<TStatus>('IDLE');
    const [message, setMessage] = useState('');
    const run = async (arg: T) => {
        setStatus('PROCESSING');
        try {
            const resp: any = await task(arg);
            setStatus('SUCCESS');
            setMessage(resp?.message || '');
            return resp;

        } catch (error) {
            let message = get(error, 'response.data.error.message') || error.message;
            setMessage(message);
            setStatus('ERROR');
            throw error
        }

    }
    const reset = () => {
        setMessage("");
        setStatus('IDLE');
    }


    return {
        run,
        status,
        message,
        reset
    }
}

export default useAsyncTask;