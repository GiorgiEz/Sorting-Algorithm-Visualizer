import {IsSorting} from "../Types";

export interface SortState {
    readonly array: number[];
    readonly isSorting: IsSorting;
    readonly compare: {index: number, key: number};
    readonly sortedIndexes: number[];
    readonly arrayLength: number;
}

export type ActionType =
    | { type: 'SET_ARRAY'; payload: number[] }
    | { type: 'SET_IS_SORTING'; payload: IsSorting }
    | { type: 'SET_COMPARE'; payload: {index: number, key: number} }
    | { type: 'SET_SORTED_INDEXES'; payload: number[] }
    | { type: 'SET_ARRAY_LENGTH'; payload: number }
