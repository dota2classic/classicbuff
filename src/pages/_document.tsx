import Document, { DocumentContext, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { GlobalStyle } from "../components/shared/global";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <script src="/static/build_info.js" />
        </Head>
        <body>
          <GlobalStyle />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
