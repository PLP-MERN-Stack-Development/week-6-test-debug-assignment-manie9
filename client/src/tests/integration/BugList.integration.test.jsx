import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this is imported for matchers like toBeInTheDocument
import BugList from '../../components/BugList';

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { _id: '1', title: 'Bug 1', status: 'open', priority: 'high' },
      ]),
  })
);

describe('BugList Integration', () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear mock calls before each test
  });

  test('fetches and displays bugs', async () => {
    render(<BugList />);

    // Check if the "Bug List" heading is rendered
    expect(screen.getByText(/Bug List/i)).toBeInTheDocument();

    // Wait for the bugs to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText(/Bug 1/i)).toBeInTheDocument();
      expect(screen.getByText(/open/i)).toBeInTheDocument();
      expect(screen.getByText(/high/i)).toBeInTheDocument();
    });
  });
});
