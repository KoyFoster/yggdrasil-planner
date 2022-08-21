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
    console.log('ranks:', ranks);

    // Start Making a group for each classification
    const groups = {} as IClassGroups;
    const rankedgroups = {} as IClassRankGroups;
    // Create groups
    classifications.forEach(cl => {
        groups[cl] = data.filter(d => d["分類 - classification"] === cl) as Array<IClass>;
        rankedgroups[cl] = [] as Array<IClassRank>;


        ranks.forEach((rank) => {
            const group = groups[cl];

            // console.log(`Adding ${rank}:`, group)

            rankedgroups[cl][rank] = group.filter(c => c["ランク - Rank"] === rank);
        });

    });

    console.log({ rankedgroups })

    return rankedgroups;
}

export const JobClasses = ({ data }: { data: IClassGroups }) => {

    const getClassIcons = () => {
        const cfs = Object.keys(data);

        console.log('data:', data)

        // Render classfications
        return cfs.map(c => {
            const jobGroups = data[c];

            // Get ranks
            let ranks = [] as Array<string>;
            ranks = jobGroups.map(group => group["ランク - Rank"] as string);
            ranks = Array.from(new Set(ranks));

            // Render Rank Groups
            return <div className='classification' key={c}>
                <h3>{c}</h3>
                {
                    ranks.map(rank => {
                        console.log({ rank });

                        // Job Classes
                        return <div>
                            <h3>{rank}</h3>
                            {
                                jobGroups[rank]?.map((group) => {
                                    const cls = group["クラス - Class"];
                                    return <ClassIcon key={cls}>{cls}</ClassIcon>;
                                })
                            }
                        </div>
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