import {ActionType} from "./redux-types";
import {IsSorting} from "../Types";

export const setArray = (array: number[]): ActionType => ({
    type: 'SET_ARRAY',
    payload: array,
});

export const setIsSorting = (isSorting: IsSorting): ActionType => ({
    type: 'SET_IS_SORTING',
    payload: isSorting,
});

export const setCompare = (value: {index: number, key: number}): ActionType => ({
    type: 'SET_COMPARE',
    payload: value,
});

export const setSortedIndexes = (indexes: number[]): ActionType => ({
    type: 'SET_SORTED_INDEXES',
    payload: indexes,
});

export const setArrayLength = (length: number): ActionType => ({
    type: 'SET_ARRAY_LENGTH',
    payload: length,
});

export const setPauseSort = (pause: boolean): ActionType => ({
    type: 'SET_PAUSE_SORT',
    payload: pause,
});