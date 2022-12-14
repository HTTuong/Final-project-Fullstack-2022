import axios from "axios";
import React from "react";

export default function useFetch(baseUrl) {
    const [error, setError] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState(undefined);
    const [executeParams, setExecuteParams] = React.useState({});

    React.useEffect(() => {
        const abortController = new AbortController();
        if (!executeParams.path) return;

        const requestBody = {}

        if (executeParams.method === 'POST') {
            Object.assign(requestBody, executeParams.body)
        }

        setIsLoading(true);
        axios({
            method: executeParams.method,
            url: baseUrl + executeParams.path,
            data: requestBody,
            headers: executeParams.headers,
            signal: abortController.signal,
        }).then(response => {
            setData(response.data)
            if (typeof executeParams.callbackAfterSuccess === 'function') {
                executeParams.callbackAfterSuccess(response)
            }
        }).catch(error => {
            setError(error)
        })
            .finally(() => setIsLoading(false))

        return () => {
            abortController.abort()
        }

    }, [baseUrl, executeParams])

    const execute = React.useCallback((params) => {
        setExecuteParams(params)
    }, [])

    return {
        error,
        isLoading,
        data,
        execute,
    }
}