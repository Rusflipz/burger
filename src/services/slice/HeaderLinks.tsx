import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
    constructorLinkValue: string,
    feedLinkValue: string,
    profileLinkValue: string,
}

export const initialState: CounterState = {
    constructorLinkValue: 'secondary',
    feedLinkValue: 'secondary',
    profileLinkValue: 'secondary',
}

export const headerLinksSlice = createSlice({
    name: 'headerLinks',
    initialState,
    reducers: {
        constructorLinkActive: (state) => {
            state.constructorLinkValue = 'primary'
        },
        feedLinkActive: (state) => {
            state.feedLinkValue = 'primary'
        },
        profileLinkActive: (state) => {
            state.profileLinkValue = 'primary'
        },
        constructorLinkNotActive: (state) => {
            state.constructorLinkValue = 'secondary'
        },
        feedLinkNotActive: (state) => {
            state.feedLinkValue = 'secondary'
        },
        profileLinkNotActive: (state) => {
            state.profileLinkValue = 'secondary'
        },
    }
})


export const {
    constructorLinkActive, feedLinkActive, profileLinkActive,
    constructorLinkNotActive, feedLinkNotActive, profileLinkNotActive

} = headerLinksSlice.actions

export const headerLinksSelector = (state: { headerLinks: CounterState }) => state.headerLinks

export default headerLinksSlice.reducer