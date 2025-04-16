import './globals.css'  // This how we import files in Next js. Also works in most React JS... find out about this  --433

export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

export default function RootLayout({ children }) {
  return (  // below -- 432
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


/** 
 * The APP folder is important in Next JS
 * 
 * Where the page JS file defines the content of a page, the layout JS file defines the shell around one or more pages. It's literally the lay - out 
 * into which a page will be rendered. Every next Project needs at least one root layout file.
 * 
 * We don't have the head set here because in Next, we already set it using a special object, metadata with its properties title, des, and more.
 * 
 * NOTE that the layout and page files work together. The layout is the wrapper while the page is the content displayed in the wrapper or layout. 
 * 
 * If you add an image called icon directly in the app folder, Next treats it as a favicon
 * 
 */