export async function onRequest(context: any, next: any) {
    const path = context.url.pathname.replace(/\/+$/, '');
    const ignorePaths = ['/waiting', '/404', '/favicon.ico'];

    if (ignorePaths.includes(path)) {
        return next();
    }

    // Redirection côté client
    const html = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>Redirection...</title>
            <script>
                window.location.replace('/waiting');
            </script>
        </head>
        <body>
        </body>
        </html>
    `;

    return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
    });
}
