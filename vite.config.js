import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Disable the public directory feature since we're building into public
  publicDir: false,
  
  // Build configuration
  build: {
    // Output directory for built files
    outDir: 'public',
    // Don't empty the entire public directory, just update the files we're building
    emptyOutDir: false,
    // Generate source maps for debugging
    sourcemap: true,
    rollupOptions: {
      input: {
        // SCSS entry point
        styles: resolve(__dirname, 'public/css/styles.scss'),
        // JavaScript entry points
        main: resolve(__dirname, 'public/js/main.js'),
        parallax: resolve(__dirname, 'public/js/parallax.js'),
      },
      output: {
        // Output CSS to the css directory
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Output JS to dist directory
        entryFileNames: 'js/dist/[name].js',
        chunkFileNames: 'js/dist/[name]-[hash].js',
      },
    },
    // Minify the output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
      },
    },
  },
  // CSS configuration
  css: {
    preprocessorOptions: {
      scss: {
        // Additional SCSS options if needed
      },
    },
  },
});
