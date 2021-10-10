import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Pokemon', () => {
  const {
    name,
    averageWeight: { value, measurementUnit },
    image,
    id,
  } = pokemons[0];

  const moreDetails = 'More details';
  test('se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe('Pikachu');

    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toBe('Electric');

    const measurements = screen.getByTestId('pokemon-weight');
    expect(measurements).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pokeImage = screen.getByAltText(`${name} sprite`);
    expect(pokeImage).toHaveAttribute('src', image);
  });

  test('se o card do Pokémoncontém um link para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const details = screen.getByText('More details');
    expect(details).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('se ao clicar no link, é feito o redirecionamento para a pág. detalhes.', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(moreDetails);
    userEvent.click(details);
    const pokeName = name;
    const detailsTitle = screen.getByRole('heading', {
      level: 2,
      name: `${pokeName} Details`,
    });
    expect(detailsTitle).toBeInTheDocument();
  });

  test('se a URL muda para /pokemon/<id>', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const details = screen.getByText(moreDetails);
    userEvent.click(details);
    const url = history.location.pathname;

    expect(url).toBe(`/pokemons/${id}`);
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(moreDetails);
    userEvent.click(details);
    const favorite = screen.getByText('Pokémon favoritado?');
    userEvent.click(favorite);
    const starSrc = '/star-icon.svg';
    const star = screen.getByAltText(`${name} is marked as favorite`);
    expect(star.src).toContain(starSrc);
  });
});
