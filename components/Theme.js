import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { theme, CSSReset } from '@chakra-ui/core';

const Theme = (props) => {
  const customTheme =extendTheme({
    breakpoints: ['30em', '48em', '62em', '80em'],
    fonts: {
      heading: '"Avenir Next", sans-serif',
      body: 'system-ui, sans-serif',
      mono: 'Menlo, monospace',
    },
    colors: {
      primary: {
        100: '#fffbda',
        200: '#fff3ad',
        300: '#ffeb7d',
        400: '#ffe34b',
        500: '#ffdb1a',
        600: '#e6c200',
        700: '#b39700',
        800: '#806c00',
        900: '#4d4100',
      },
      secondary: {
        50: '#ecf9f8',
        100: '#cceae9',
        200: '#abdedb',
        300: '#88d2cd',
        400: '#69c4bf',
        500: '#53aca5',
        600: '#418581',
        700: '#2f5e5c',
        800: '#1c3937',
        900: '#061313',
      },
      tertiary: {
        50: '#e5fbfb',
        100: '#c6ecec',
        200: '#a3dede',
        300: '#80d1d1',
        400: '#60c5c5',
        500: '#48abab',
        600: '#378585',
        700: '#265f5f',
        800: '#133939',
        900: '#001414',
      },

      background: '#fffffe',
      headline: '#272343',
      paragraph: '#2d334a',
      buttonText: '#272343',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
  });

  return (
    <ChakraProvider theme={customTheme}>
        <CSSReset />
      {props.children}
    </ChakraProvider>
  );
};

export default Theme;
