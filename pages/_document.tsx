// https://nextjs.org/docs/messages/no-page-custom-font
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Alegreya+Sans+SC:300&display=optional"
            rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=Sawarabi+Mincho&display=optional"
            rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;