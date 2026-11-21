function handler(event) {
    let request = event.request;
    let uri = request.uri;

    if (
        uri !== '/api' &&
        !uri.startsWith('/api/') &&
        !uri.startsWith('/assets/') &&
        !uri.split('/').pop().includes('.')
    ) {
        request.uri = '/index.html';
    }

    return request;
}
