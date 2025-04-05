import localFont from 'next/font/local'

// Load your custom font files
export const headingsFont = localFont({
  src: [
    {
      path: './fonts/wild-magnolia.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/wild-magnolia.otf',
      weight: '700',
      style: 'normal',
    },
    // Add more font variations as needed
  ],
  display: 'swap',
  variable: '--font-headings', // CSS variable name
})

// Update the script font to use Wild-Magnolia
export const scriptFont = localFont({
  src: './fonts/wild-magnolia.otf',
  display: 'swap',
  variable: '--font-script',
})

// Update the script font to use Wild-Magnolia
export const gorgeousFont = localFont({
  src: './fonts/gorgeous-serif.otf',
  display: 'swap',
  variable: '--font-gorgeous',
})

// Add Optima font with different weights
export const primaryFont = localFont({
  src: [
    {
      path: './fonts/optima.ttf', // Normal weight
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/optima-bold.ttf', // Medium weight
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/optima-black.ttf', // Heavy weight
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-primary', // CSS variable name
}) 