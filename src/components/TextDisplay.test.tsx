import React from 'react';
import { render, screen } from '@testing-library/react';
import TextDisplay from './TextDisplay';

//que el componente muestra el título pasado por props
//que el contenido del textarea es el texto esperado
describe('TextDisplay', () => {
  it('renderiza el título y el contenido', () => {
    render(<TextDisplay title="Resumen del Video" text="Este es un resumen" />);
    expect(screen.getByText('Resumen del Video')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Este es un resumen')).toBeInTheDocument();
  });
});
