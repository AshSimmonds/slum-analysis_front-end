import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />

                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700;900&display=swap" rel="stylesheet" />


                    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@300&display=swap" rel="stylesheet" />

                    <link rel="stylesheet" type="text/css" href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
