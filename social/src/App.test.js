import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders correctly', () => {
    render(<App />);
    // Ищем текст, который действительно рендерится
    expect(screen.getByText('Добро пожаловать в социальную сеть')).toBeInTheDocument();
  });
});