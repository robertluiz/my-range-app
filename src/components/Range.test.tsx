import { render, fireEvent } from "@testing-library/react";
import { Range, RangeProps } from './Range';

describe('Range', () => {
    let props: RangeProps;

    beforeEach(() => {
        props = {
            minValue: 0,
            maxValue: 100
        };
    });

    test('initializes with correct default values', () => {
        const { getByText } = render(<Range {...props} />);
        expect(getByText("0.00€")).toBeTruthy();
        expect(getByText("100.00€")).toBeTruthy();
    });

    test('updates min value when clicked', () => {
        const { getByText } = render(<Range {...props} />);
        jest.spyOn(window, 'prompt').mockReturnValue('10');
        fireEvent.click(getByText("0.00€"));
        expect(getByText("10.00€")).toBeTruthy();
    });

    test('updates max value when clicked', () => {
        const { getByText } = render(<Range {...props} />);
        jest.spyOn(window, 'prompt').mockReturnValue('90');
        fireEvent.click(getByText("100.00€"));
        expect(getByText("90.00€")).toBeTruthy();
    });



    test('does not update min value beyond max value', () => {
        const { getByTestId } = render(<Range {...props} />);
        const minHandle = getByTestId('min-handle');
        fireEvent.mouseDown(minHandle);
        fireEvent.mouseMove(document.body, { clientX: 150 });
        fireEvent.mouseUp(document.body);
        // @ts-ignore
        expect(getByTestId('min-handle')).not.toHaveClass('dragging');
    });

    test('does not update max value beyond min value', () => {

        const { getByTestId } = render(<Range {...props} />);
        const maxHandle = getByTestId('max-handle');
        fireEvent.mouseDown(maxHandle);
        fireEvent.mouseMove(document.body, { clientX: 50 });
        fireEvent.mouseUp(document.body);
        // @ts-ignore
        expect(getByTestId('max-handle')).not.toHaveClass('dragging');
    });


});


