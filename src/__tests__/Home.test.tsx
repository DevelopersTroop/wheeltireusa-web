import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import Homepage from '@/app/(home)/page';

describe('When everyting is okay', () => {
  it('should run fine', () => {
    render(<Homepage />);
  });
});
