import { createStitches } from '@stitches/react';

export const nordColors = {
  nord0: '#2e3440',
  nord1: '#3b4252',
  nord2: '#434c5e',
  nord3: '#4c566a',
  nord4: '#d8dee9',
  nord5: '#e5e9f0',
  nord6: '#eceff4',
  nord7: '#8fbcbb',
  nord8: '#88c0d0',
  nord9: '#81a1c1',
  nord10: '#5e81ac',
  nord11: '#bf616a',
  nord12: '#d08770',
  nord13: '#ebcb8b',
  nord14: '#a3be8c',
  nord15: '#b48ead',
}

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...nordColors,
      background: nordColors.nord0,
      foreground: nordColors.nord1,
      text: nordColors.nord6,
      
      danger: nordColors.nord11,
      success: nordColors.nord14,
      warning: nordColors.nord12,
      
      primary: nordColors.nord8,
      secondary: nordColors.nord9,
      tertiary: nordColors.nord10,
    },
    space: {
      tiny: '.25rem',
      small: '.5rem',
      normal: '1rem',
      medium: '1.5rem',
      large: '2rem',
      big: '3rem',
      huge: '5rem',
    },
    fontSizes: {
      root: '16px',
      tiny: '.25rem',
      small: '.5rem',
      normal: '1rem',
      medium: '1.5rem',
      large: '2rem',
      big: '3rem',
      huge: '5rem',
    },
    fonts: {
      normal: 'Untitled Sans, apple-system, sans-serif',
      mono: 'Söhne Mono, menlo, monospace',
    },
  },
  media: {
    bp1: '(min-width: 480px)',
  },
});