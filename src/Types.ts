import {MutableRefObject} from "react";

export interface Props{
    pause: MutableRefObject<boolean>
    endSorting: MutableRefObject<boolean>
    sortingSpeed: MutableRefObject<number>
    stopSorting: () => boolean
}

export type IsSorting = {
    insertionSort: boolean,
    mergeSort: boolean,
    selectionSort: boolean,
    bubbleSort: boolean,
    quickSort: boolean,
}

// stack type used to implement quicksort iteratively
export type StackType = {
    start: number,
    end: number
}
