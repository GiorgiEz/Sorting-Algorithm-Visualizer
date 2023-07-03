import {MutableRefObject} from "react";

export interface Props{
    pause: MutableRefObject<boolean>
    endSorting: MutableRefObject<boolean>
    sortingSpeed: MutableRefObject<number>
}

export type IsSorting = {
    insertionSort: boolean,
    mergeSort: boolean,
    selectionSort: boolean,
}