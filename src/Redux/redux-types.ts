import {IsSorting} from "../Types";

export interface SortState {
    readonly array: number[];
    readonly isSorting: IsSorting;
    readonly compare: {val1: number, val2: number};
    readonly sortedIndex: number;
    readonly arrayLength: number;
}

export type ActionType =
    | { type: 'SET_ARRAY'; payload: number[] }
    | { type: 'SET_IS_SORTING'; payload: IsSorting }
    | { type: 'SET_COMPARE'; payload: {val1: number, val2: number} }
    | { type: 'SET_SORTED_INDEX'; payload: number }
    | { type: 'SET_ARRAY_LENGTH'; payload: number }
