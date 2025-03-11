export interface CaptionResult {
    text: string;
    confidence: number;
}

export interface DenseCaption {
    text: string;
    confidence: number;
    boundingBox: number[];
}

export interface DenseCaptionsResult {
    values: DenseCaption[];
}

export interface Metadata {
    width: number;
    height: number;
}

export interface Tag {
    name: string;
    confidence: number;
}

export interface TagsResult {
    values: Tag[];
}

export interface ReadBlock {
    text: string;
    boundingBox: number[];
}

export interface ReadResult {
    blocks: ReadBlock[];
}

export interface Object {
    tags: Tag[];
    boundingBox: number[];
}

export interface ObjectResult {
    values: Object[];
}

export interface People {
    confidence: number;
    boundingBox: number[];
}

export interface PeopleResult {
    values: People[];
}

export interface ImageAnalysisResult {
    modelVersion: string;
    captionResult: CaptionResult;
    denseCaptionsResult: DenseCaptionsResult;
    objectsResult: ObjectResult;
    peopleResult: PeopleResult;
    metadata: Metadata;
    tagsResult: TagsResult;
    readResult: ReadResult;
}