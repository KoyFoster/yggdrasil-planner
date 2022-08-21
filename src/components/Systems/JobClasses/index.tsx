import { group } from "console";
import React from "react";
import { IClass, IClassGroups } from "../../../global/types";
import { ClassIcon } from "../../UI";
import css from './style.css'

// assuming all data is coming in as string
export const parseClassData = (data: Array<IClass>) => {

    const formattedData = data?.map((d: IClass, _index) => {
        // if (!index) return null;
        // Parse out empty rows
        if (!d["クラス - Class"] || d["クラス - Class"] === '0') return null;

        const fd = d;
        let rank = Number.isNaN(Number(fd["ランク - Rank"])) === true ? fd["ランク - Rank"] : Number(fd["ランク - Rank"]);

        // Check Skill Point Rank
        if (typeof rank === 'number') {
            if (rank >= 10) rank = 'レア - Rare';
            else if (rank >= 5) rank = 'ハイ - High';
            else rank = 'ベース - Base';
        }
        return fd;
    }).filter(d => d !== null) as Array<IClass> | null;

    if (formattedData)
        return groupClassses(formattedData);
    return null;
}

// Group data by classification
export const groupClassses = (data: Array<IClass>) => {
    // Get all possible classifications
    let classifications = [] as Array<string>;
    classifications = data.map(d => d["分類 - classification"]);
    classifications = Array.from(new Set(classifications));

    // Start Making a group for each classification
    const groups = {} as IClassGroups;
    // Create groups
    classifications.forEach(cl => { groups[cl] = data.filter(d => d["分類 - classification"] === cl) as Array<IClass> });

    return groups;
}

export const JobClasses = ({ data }: { data: IClassGroups }) => {

    const getClassIcons = () => {
        const cfs = Object.keys(data);

        return cfs.map(c => {
            const jobClass = data[c];

            return <div className='classification' key={c}>
                {jobClass?.map((d) => {
                    const cls = d["クラス - Class"];
                    return <ClassIcon key={cls}>{cls}</ClassIcon>;
                })}
            </div>
        })

    }
    const icons = getClassIcons();

    return <div className={css['classes']}>
        {icons}
    </div>
}