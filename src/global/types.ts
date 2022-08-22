export interface IClass {
    [index: string | number]: string | number;
    '分類 - classification': string;
    'クラス - Class': string;
    'ランク - Rank': string | number;
    '必要条件 - Req': string;
    'Active Skills': string;
    'Passive Skills': string;
    'Details': string;
}

export interface IClassGroups {
    [index: string | number]: Array<IClass>;
}

export enum CLASS_RANKS {
    '不明 - undefined',
    'ベース - Base',
    'ハイ - High',
    'レア - Rare'
}

export interface IClassRank {
    [index: string | number]: Array<IClass>;
}

export interface IClassRankGroups {
    [index: string | number]: IClassRank;
}