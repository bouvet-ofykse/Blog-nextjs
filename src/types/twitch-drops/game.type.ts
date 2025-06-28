
export type Game = {
    gameId: string;
    gameDisplayName: string;
    gameBoxArtURL: string;
    startAt: Date;
    endAt: Date;
    rewards: Reward[];
}

export type Reward = {
    id: string;
    name: string;
    description: string;
    detailsURL: string;
    imageURL: string;
    status: string;
    startAt: string;
    endAt: string;
    accountLinkURL: string;
    game: {
        id: string;
        slug: string;
        displayName: string;
    };
    owner: {
        id: string;
        name: string;
    };
    timeBasedDrops: TimeBasedDrop[];
    // eventBasedDrops: any[];
}

export type TimeBasedDrop = {
    id: string;
    name: string;
    startAt: string;
    endAt: string;
    requiredSubs: number;
    requiredMinutesWatched: number;
    benefitEdges: BenefitEdge[];
    imageAssetURL: string;
}

export type BenefitEdge = {
    benefit: {
        id: string;
        name: string;
        imageAssetURL: string;
        createdAt: string;
        distributionType: string;
        entitlementLimit: number;
        isIosAvailable: boolean;
        ownerOrganization: {
            id: string;
            name: string;
        };
        game: {
            id: string;
            name: string;
        };
    };
}




