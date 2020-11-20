export type MasterData = {
    masterText: string;
    childs: DetailData[];
}

export type DetailData = {
    detailText: string;
}

export const data: MasterData = {
    masterText: 'masterText',
    childs: [
        { detailText: 'detailText1' },
        { detailText: 'detailText2' }
    ]
}