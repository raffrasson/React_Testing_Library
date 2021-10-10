import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Pokedex', () => {
  test('se a página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const encounteredHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(encounteredHeading).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(button).toBeInTheDocument();

    const firstPokemon = screen.getByTestId('pokemon-name');

    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(button);

    const secondPokemon = screen.getByText('Charmander');

    expect(secondPokemon).toBeInTheDocument();
  });

  test('se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonNumber = screen.getAllByTestId('pokemon-name');

    expect(pokemonNumber.length).toBe(1);
  });

  test('se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const typeButtonArray = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const seven = 7;

    expect(typeButtonArray.length).toBe(seven);

    typeButtonArray.forEach((button, index) => {
      expect(button.innerHTML).toBe(types[index]);
    });
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(resetButton).toBeInTheDocument();

    const firstType = screen.getByTestId('pokemon-type');
    expect(firstType.innerHTML).toBe('Electric');

    const bugButton = screen.getByRole('button', {
      name: 'Bug',
    });

    userEvent.click(bugButton);
    userEvent.click(resetButton);

    const button = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    userEvent.click(button);

    const secondType = screen.getByTestId('pokemon-type');

    expect(secondType.innerHTML).toBe('Fire');
  });
});
