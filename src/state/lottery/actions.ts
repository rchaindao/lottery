import { createAction } from '@reduxjs/toolkit'

export enum LotteryField {
  AMOUNT = 'AMOUNT',
}

export const typeInput = createAction<{ field: LotteryField; typedValue: string }>('lottery/typeInput')
export const selectLottery = createAction<{ lotteryAddress: string }>('lottery/selectLottery')
export const refreshRemainTime = createAction<{ remainTime: number|undefined }>('lottery/remainTime')

