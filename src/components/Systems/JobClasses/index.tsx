import { group } from "console";
import React from "react";
import { IClass, IClassGroups, IClassRank, IClassRankGroups } from "../../../global/types";
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
            if (rank >= 10) fd["ランク - Rank"] = 'レア - Rare';
            else if (rank >= 5) fd["ランク - Rank"] = 'ハイ - High';
            else fd["ランク - Rank"] = 'ベース - Base';
        }
        return fd;
    }).filter(d => d !== null) as Array<IClass> | null;

    if (formattedData)
        return groupClassses(formattedData);
    return null;
}

// Assumptions
// Classes are base jobs
// Jobs are Advanced classes
// Rare are even more advanced classes
// 15 > 10 > 5

const groupRanks = (data: IClassGroups) => {

}

// Group data by classification
const groupClassses = (data: Array<IClass>) => {
    // Get all possible classifications
    let classifications = [] as Array<string>;
    classifications = data.map(d => d["分類 - classification"]);
    classifications = Array.from(new Set(classifications));

    let ranks = [] as Array<string>;
    ranks = data.map(d => d["ランク - Rank"] as string);
    ranks = Array.from(new Set(ranks)).filter(r => !!r);

    // Start Making a group for each classification
    const rankedgroups = {} as IClassRankGroups;

    // Create groups
    classifications.forEach(cl => {
        const group = data.filter(d => d["分類 - classification"] === cl) as Array<IClass>;
        rankedgroups[cl] = {} as IClassRank;
        const rankedgroup = rankedgroups[cl];
        ranks.forEach((rank: string) => {
            const rg = group.filter(c => c["ランク - Rank"] === rank);
            if (rg.length) {
                rankedgroup[rank] = group.filter(c => c["ランク - Rank"] === rank);
            }
        });
    });

    return rankedgroups;
}

export const JobClasses = ({ data }: { data: IClassRankGroups }) => {

    const getClassIcons = () => {
        if (!data) return null;
        console.log('data:', data);
        const dKeys = Object.keys(data);

        // Render classfications
        return dKeys.map(classficationKey => {
            const classfication = data[classficationKey];
            const cfKeys = Object.keys(classfication);
            console.log({ classfication })

            // Classification 
            return <div key={classficationKey}>
                <h3>{classficationKey}</h3>
                {
                    cfKeys.map((rankKey) => {
                        const rank = classfication[rankKey];
                        const rKeys = Object.keys(rank);

                        // Ranks
                        return <div key={rankKey}>
                            <h4>{rankKey}</h4>
                            {
                                rKeys.map(rKey => {
                                    const jobClass = rank[rKey];

                                    return <ClassIcon key={rKey}>{jobClass['クラス - Class']}</ClassIcon>
                                })
                            }
                        </div>;
                    })
                }
            </div>

        })

    }
    const icons = getClassIcons();

    return <div className={css['classes']}>
        <h2></h2>
        {icons}
    </div>
}