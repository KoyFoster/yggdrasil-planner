import React, { useEffect, useState } from 'react';
import { JobClasses, parseClassData } from './components/Systems/JobClasses';
import { IClass } from './global/types';
import GSSServices from './services/GSSServices';
import './styles/App.css';

function App() {
    const { data, error, setData } = GSSServices.components.GetSheetData('https://docs.google.com/spreadsheets/d/e/2PACX-1vTV7PZlNztlPWZ0Wh-KVO1eATqEboaNg3XkamCw5mzQ3dyQCGGSWTo73gBQCPRkJvZcXNnC9oSyPtpw/pub?gid=0&single=true&output=tsv');
    const [classData, setClassData] = useState([] as Array<IClass> | null);

    useEffect(() => {
        if (data) {
            setClassData(parseClassData(data as Array<IClass>));
            // Deallocate memory
            setData(null);
        }
    }, [data]);

    return (
        <div className="App">
            <header className="App-header">
                <JobClasses data={classData}></JobClasses>
            </header>
        </div>
    );
}

export default App;
