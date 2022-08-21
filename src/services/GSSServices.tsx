import React, { useEffect, useState } from 'react';
import Papa from "papaparse";

// I'm currently lazy and not willing auth code, so this code assumes the spreadsheet is set to public
const GetDoc = (url: string, callback: (results: Papa.ParseResult<unknown>) => void) => {
    Papa.parse(url, {
        download: true,
        header: true,
        complete: callback,
    });
}

const GetSheetData = (url?: string, options?: Record<string, never> | null) => {
    const [data, setData] = useState(null as {} | null);
    const [error, setError] = useState(null as Record<string, never> | null);

    const loadData = async () => {
        if (!url) return;

        setData(null);
        try {
            GetDoc(url, (res) => { const { data } = res; setData(Array.from(data)); });
        } catch (e) {
            setError(e as Record<string, never>);
        }
    };

    useEffect(() => {
        loadData();
    }, [url, options]);

    return { data, error, setData };
};

const GSSServices = {
    components: { GetSheetData },
};

export default GSSServices;
