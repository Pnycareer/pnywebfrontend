import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta
          name="google-site-verification"
          content="xt9UQlTcyB46zJ1blAQyrgQvW-0AdlxqSsmkR8bUB4Y"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Manrope:wght@200&family=Poppins:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
