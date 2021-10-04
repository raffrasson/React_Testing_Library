import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../components/renderWithRouter';

describe('About', () => {
  test('se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutInfo = screen.getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    expect(aboutInfo).toBeInTheDocument();
  });
  test('se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutHeading).toBeInTheDocument();
  });
  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstPar = screen.getByText(/This application simulates a Pokédex/);
    expect(firstPar).toBeInTheDocument();
    const secondPar = screen.getByText(/One can filter Pokémons by type,/);
    expect(secondPar).toBeInTheDocument();
  });
  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    // ref: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    // explicação: o código pega a img pelo alt text e usa um matcher de atributo para testar se é a img correta
    renderWithRouter(<About />);
    const image = screen.getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
