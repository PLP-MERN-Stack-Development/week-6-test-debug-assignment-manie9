import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this is imported for matchers like toBeInTheDocument
import BugList from '../../components/BugList';

// Mock the global fetch function
global.fetch = jest.fn();

describe('BugList Edge Cases', () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear mock calls before each test
  });

  test('handles empty bug list', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });

    render(<BugList />);
    expect(screen.getByText(/Bug List/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('listitem')).toBeNull();
    });
  });

  test('handles fetch error gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Fetch error'));

    render(<BugList />);
    expect(screen.getByText(/Bug List/i)).toBeInTheDocument();

    await waitFor(() => {
      // No bugs displayed, but no crash
      expect(screen.queryByRole('listitem')).toBeNull();
    });
  });
});
