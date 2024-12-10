
import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import App from '../App'

test("App renders", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Task List/i)).toBeInTheDocument();
});