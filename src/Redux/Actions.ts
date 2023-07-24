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

export const setCompare = (value: {val1: number, val2: number}): ActionType => ({
    type: 'SET_COMPARE',
    payload: value,
})

export const setSortedIndex = (indexes: number): ActionType => ({
    type: 'SET_SORTED_INDEX',
    payload: indexes,
});

export const setArrayLength = (length: number): ActionType => ({
    type: 'SET_ARRAY_LENGTH',
    payload: length,
});
