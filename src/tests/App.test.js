import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('App', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: 'Home' });
    expect(home).toBeInTheDocument();
    const about = screen.getByRole('link', {
      name: 'About' });
    expect(about).toBeInTheDocument();
    const favoritePokemons = screen.getByRole('link', {
      name: 'Favorite Pokémons' });
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('se a aplicação é redirecionada para a página inicial,'
  + 'na URL / ao clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: 'Home' });
    userEvent.click(home);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  test('se a aplicação é redirecionada para a página About,'
  + 'na URL /about ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: 'About' });
    userEvent.click(about);
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  test('se a aplicação é redirecionada para a página de Pokémons Favoritados,'
  + 'na URL /favorites ao clicar Favorite Pokemons da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', {
      name: 'Favorite Pokémons' });
    expect(favoritePokemons).toBeInTheDocument();
    userEvent.click(favoritePokemons);
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });

  test('se a aplicação é redirecionada para a página Not Found '
  + 'ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/endereco-inexistente');
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found Crying emoji/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
