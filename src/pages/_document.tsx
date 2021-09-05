import React from "react";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

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

  private ym() {
    return `<!-- Yandex.Metrika counter -->
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(65944870, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/65944870" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->`;
  }

  private adSense() {
    return `
    <script data-ad-client="ca-pub-2522763197238996" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
`;
  }

  private ga() {
    return `<!-- Global site tag (gtag.js) - Google Analytics -->

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-105333084-2"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-105333084-3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-105333084-2');
  gtag('config', 'UA-105333084-3');

</script>
`;
  }
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="canonical" href="https://dota2classic.ru" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
            crossOrigin="anonymous"
          />
          <link rel="icon" type="image/png" href="https://dota2classic.ru/api/static/favicon.png" />
          <link rel="stylesheet" href="https://dota2classic.ru/api/static/style.css" />
          <link rel="stylesheet" href="https://dota2classic.ru/api/static/minimap.css" />
          <script src="/static/build_info.js" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/brackets-viewer@1.3.3/dist/brackets-viewer.min.css"
          />
          <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/npm/brackets-viewer/dist/brackets-viewer.min.js"
          />

          <span dangerouslySetInnerHTML={{ __html: this.adSense() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <span dangerouslySetInnerHTML={{ __html: this.ga() }} />
          {/*<span dangerouslySetInnerHTML={{ __html: this.ym() }} />*/}
        </body>
      </Html>
    );
  }
}
