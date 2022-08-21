import React from "react";
import { IClass } from "../../../global/types";
import { ClassIcon } from "../../UI";
import css from './style.css'

// assuming all data is coming in as string
export const parseClassData = (data: Array<IClass>) => {
    return data?.map((d: IClass, _index) => {
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
}

export const JobClasses = ({ data }: { data: Array<IClass> | null }) => {

    const getClasses = () => {
        return data?.map((d) => {
            const cls = d["クラス - Class"];
            return <ClassIcon key={cls}>{cls}</ClassIcon>;
        });
    }
    const classes = getClasses();

    return <div className={css['classes']}>
        {classes}
    </div>
}