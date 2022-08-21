import React from 'react';

interface IFProps {
    data?: object;
}

function getForms(data: object) {
    const keys = Object.keys(data);
    let result = [];

    keys.forEach((key) => {
        const d = data[key];

        switch (typeof d) {
            case 'string':
                console.log('string:', d);
                result.push(<input type="string" key={key} value={d} />);
                break;
            case 'number':
            case 'bigint':
                console.log('number:', d);
                result.push(<input type="number" key={key} value={d} />);
                break;
            case 'object':
                console.log('object:', d);
                result = [...result, ...getForms(d)];
                break;
            case 'undefined':
            case 'function':
            default:
                break;
        }
    });

    console.log('result:', result);
    return result;
}

export const InterfaceForm = ({ data }: IFProps) => {
    const elements = [];

    return <div>{getForms(data)}</div>;
};
