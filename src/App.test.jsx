import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import routes from './Routes';

const product = {
  id: 1,
  title: 'Test product',
  price: 12.5,
  image: '/product.png',
};

function renderApp(initialEntry = '/shop') {
  const router = createMemoryRouter(routes, { initialEntries: [initialEntry] });
  render(<RouterProvider router={router} />);
}

describe('cart quantity controls', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([product]) })));
  });

  it('increments and decrements an item quantity, removing it at zero', async () => {
    renderApp();

    fireEvent.click(await screen.findByRole('button', { name: 'Add Test product to bag' }));
    expect(screen.getAllByRole('link', { name: /bag/i })[0]).toHaveTextContent('Bag1');
    fireEvent.click(screen.getAllByRole('link', { name: /bag/i })[0]);

    const cartItem = await screen.findByRole('heading', { name: 'Test product' });
    const row = cartItem.closest('.cart-item');
    expect(row).not.toBeNull();
    expect(within(row).getByText('1')).toBeInTheDocument();

    fireEvent.click(within(row).getByRole('button', { name: 'Increase Test product quantity' }));
    expect(within(row).getByText('2')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /bag/i })[0]).toHaveTextContent('Bag2');

    fireEvent.click(within(row).getByRole('button', { name: 'Decrease Test product quantity' }));
    expect(within(row).getByText('1')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /bag/i })[0]).toHaveTextContent('Bag1');

    fireEvent.click(within(row).getByRole('button', { name: 'Decrease Test product quantity' }));
    await waitFor(() => expect(screen.getByText('Your bag is taking a break.')).toBeInTheDocument());
    expect(screen.getAllByRole('link', { name: /bag/i })[0]).toHaveTextContent('Bag0');
    expect(screen.queryByRole('heading', { name: 'Test product' })).not.toBeInTheDocument();
  });

  it('increments an existing item when the same product is added again', async () => {
    renderApp();

    const addButton = await screen.findByRole('button', { name: 'Add Test product to bag' });
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(screen.getAllByRole('link', { name: /bag/i })[0]);

    const cartItem = await screen.findByRole('heading', { name: 'Test product' });
    const row = cartItem.closest('.cart-item');
    expect(within(row).getByText('2')).toBeInTheDocument();
  });
});
