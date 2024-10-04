import { render, screen, fireEvent } from '@testing-library/react';
import StringCalculator from './App';

describe('StringCalculator', () => {
  test('renders String Calculator and calculates sum correctly', () => {
    render(<StringCalculator />);

    expect(screen.getByText(/String Calculator/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter numbers/i)).toBeInTheDocument();
    expect(screen.getByText(/Calculate/i)).toBeInTheDocument();

    const inputField = screen.getByLabelText(/Enter numbers/i);
    fireEvent.change(inputField, { target: { value: '1,5' } });

    const calculateButton = screen.getByText(/Calculate/i);
    fireEvent.click(calculateButton);

    expect(screen.getByText(/Result: 6/i)).toBeInTheDocument();
  });

  test('handles negative numbers and throws error', () => {
    render(<StringCalculator />);

    const inputField = screen.getByLabelText(/Enter numbers/i);
    fireEvent.change(inputField, { target: { value: '1,-2' } });

    const calculateButton = screen.getByText(/Calculate/i);
    fireEvent.click(calculateButton);

    expect(screen.getByText(/Negatives not allowed: -2/i)).toBeInTheDocument();
  });

  test('handles custom delimiter', () => {
    render(<StringCalculator />);

    const inputField = screen.getByLabelText(/Enter numbers/i);
    fireEvent.change(inputField, { target: { value: '//;\n1;2' } });

    const calculateButton = screen.getByText(/Calculate/i);
    fireEvent.click(calculateButton);

    expect(screen.getByText(/Result: 3/i)).toBeInTheDocument();
  });

  test('handles multiple delimiters', () => {
    render(<StringCalculator />);

    const inputField = screen.getByLabelText(/Enter numbers/i);
    fireEvent.change(inputField, { target: { value: '//[***][%%%]\n1***2%%%3' } });

    const calculateButton = screen.getByText(/Calculate/i);
    fireEvent.click(calculateButton);

    expect(screen.getByText(/Result: 6/i)).toBeInTheDocument();
  });

  test('ignores numbers larger than 1000', () => {
    render(<StringCalculator />);

    const inputField = screen.getByLabelText(/Enter numbers/i);
    fireEvent.change(inputField, { target: { value: '2,1001' } });

    const calculateButton = screen.getByText(/Calculate/i);
    fireEvent.click(calculateButton);

    expect(screen.getByText(/Result: 2/i)).toBeInTheDocument();
  });
});
