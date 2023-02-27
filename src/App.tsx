import React, { useEffect, useState } from 'react';
import { JobClasses, parseClassData } from './components/Systems/JobClasses';
import { IClass, IClassRankGroups } from './global/types';
import GSSServices from './services/GSSServices';
import './styles/App.css';

function App() {
    const { data, error, setData } = GSSServices.components.GetSheetData('https://docs.google.com/spreadsheets/d/e/2PACX-1vQlz3ZrF9XVOIf-DpeQ2Qz8-dJoGk9U17wsP24VFvskaiFOrMwSsQGGrGDXTsBLC6EZw_FjaeVhS-j5/pub?output=tsv');
    const [classData, setClassData] = useState(null as IClassRankGroups | null);

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
                <JobClasses data={classData as IClassRankGroups}></JobClasses>
            </header>
        </div>
    );
}

export default App;
