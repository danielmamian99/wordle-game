import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import { Header } from "../../src/components"
import { uiSlice } from "../../src/store/slices/ui";


const store = configureStore({
    reducer:{
        ui: uiSlice.reducer
    },
    preloadedState:{
        ui: {
            mode: 'Light',
            isHowToPlayModalOpen: false,
            isStatsModalOpen: false
        }
    }
});

describe('Header Test', () => { 
    test('should toggle mode by clicking on switch mode', () => { 
        render(
            <Provider store={ store }>
                <Header/>
            </Provider>
        )
        let images = screen.getAllByRole('img');
        images.forEach((img) => {
            expect(img.attributes.getNamedItem('src')?.textContent).contain('Light');
        })
        const button = screen.getByTestId('button-change-mode');
        fireEvent.click(button);
        images = screen.getAllByRole('img');
        images.forEach((img) => {
            expect(img.attributes.getNamedItem('src')?.textContent).contain('Dark');
        })
    })
})