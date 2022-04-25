import { render, screen } from '@testing-library/react';
import { Greeting } from '../src/sample/components/TestGreeting';
import '@testing-library/jest-dom';

describe('Greeting Component Test', () => {
  it('it shoulds greet to user.', () => {
    render(<Greeting name='obama' />);

    expect(screen.getByText('Hello obama')).toBeInTheDocument();
  });
});
