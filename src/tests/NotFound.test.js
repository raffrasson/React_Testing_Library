import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../components/renderWithRouter';

describe('Not Found', () => {
  test('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFoundText).toBeInTheDocument();
  });
  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    // ref: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    // explicação: o código pega a img pelo alt text e usa um matcher de atributo para testar se é a img correta
    renderWithRouter(<NotFound />);
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
