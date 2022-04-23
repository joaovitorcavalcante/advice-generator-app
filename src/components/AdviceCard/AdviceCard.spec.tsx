import '@testing-library/jest-dom';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';

import { AdviceCard } from '.';

describe('<AdviceCard />', () => {
  it('should render AdviceCard with default advice', () => {
    render(<AdviceCard />);

    expect(
      screen.getByRole('heading', { name: /advice #117/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /“it is easy to sit up and take notice, what's difficult is getting up and taking action\.”/i
      )
    ).toBeInTheDocument();
  });

  it('should render AdviceCard with custom advice', async () => {
    render(<AdviceCard />);

    const changeAdviceForm = screen.getByTestId('change-advice');

    fireEvent.submit(changeAdviceForm);

    await waitFor(() => {
      expect(
        screen.queryByText(
          /“it is easy to sit up and take notice, what's difficult is getting up and taking action\.”/i
        )
      ).toBeNull();
    });
  });
});
