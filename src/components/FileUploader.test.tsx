import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileUploader from './FileUploader';

//que el título, la descripción y el estado de carga se rendericen
//asegura que el componente está mostrando la UI esperada
describe('FileUploader', () => {
  it('muestra el texto y el botón de subir', () => {
    render(<FileUploader onFileChange={() => {}} status="Subiendo..." />);
    expect(screen.getByText('Procesador de Videos')).toBeInTheDocument();
    expect(screen.getByText('Sube un video para generar un resumen automático')).toBeInTheDocument();
    expect(screen.getByText('Subiendo...')).toBeInTheDocument();
  });

  //que cuando el usuario selecciona un archivo, se llama correctamente a la función onFileChange.
  //simula una acción real del usuario.
  it('llama al evento cuando se sube un archivo', () => {
    const mockChange = jest.fn();
    render(<FileUploader onFileChange={mockChange} status="" />);
    const input = screen.getByLabelText('Subir video');
    fireEvent.change(input, {
      target: { files: [new File(['video'], 'video.mp4', { type: 'video/mp4' })] }
    });
    expect(mockChange).toHaveBeenCalledTimes(1);
  });
});
