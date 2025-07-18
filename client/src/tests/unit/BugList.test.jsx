import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Add this import
import BugList from '../../components/BugList';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ _id: '1', title: 'Bug 1', status: 'open', priority: 'high' }]),
  })
);

describe('BugList Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders bug list', async () => {
    render(<BugList />);
    expect(screen.getByText(/Bug List/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Bug 1/i)).toBeInTheDocument();
      expect(screen.getByText(/open/i)).toBeInTheDocument();
      expect(screen.getByText(/high/i)).toBeInTheDocument();
    });
  });
});