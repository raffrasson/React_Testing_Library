import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('favorite pokemons', () => {
  test('se é exibido No favorite pokemon found, se a pessoa não tiver favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const favText = screen.getByText('No favorite pokemon found');
    expect(favText).toBeInTheDocument();
  });
  test('se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(details);

    const isFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    userEvent.click(isFavorite);

    const favList = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(favList);

    const card = screen.getAllByTestId('pokemon-name');

    expect(card[0]).toBeInTheDocument();
  });
});
