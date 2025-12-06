export class Ajax {
    defaultOptions = {};

    constructor(options = {}) {
        this.defaultOptions = {
            BaseUrl: options.BaseUrl || 'https://jsonplaceholder.typicode.com',
            timeout: options.timeout || 5000,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        };
    }

    async get(url, options, responseLimit = 0) {
        return await this.requestHandler(
            'GET',
            url,
            null,
            options,
            responseLimit
        );
    }
    async post(url, data, options) {
        return await this.requestHandler('POST', url, data, options);
    }
    async put(url, data, options) {
        return await this.requestHandler('PUT', url, data, options);
    }
    async delete(url, options) {
        return await this.requestHandler('DELETE', url, null, options);
    }

    async requestHandler(
        Method,
        Url,
        data = null,
        options = {},
        Responselimit = 0
    ) {
        let url;
        if (Url) url = Url;
        else url = this.defaultOptions.BaseUrl + '/posts';
        if ('deleteId' in options && Method == 'DELETE')
            url += '/' + options.deleteId;
        else if (Responselimit > 0 && Method == 'GET')
            url += '?_limit=' + Responselimit;

        let request = { method: Method };

        if ('timeout' in options)
            request['signal'] = AbortSignal.timeout(options.timeout);
        else
            request['timeout'] = AbortSignal.timeout(
                this.defaultOptions.timeout
            );
        if ('headers' in options) request['headers'] = options.headers;
        else request['headers'] = this.defaultOptions.headers;
        request['headers']['Content-Type'] = 'application/json';

        if (Method == 'POST' || Method == 'PUT')
            request.body = JSON.stringify(data);

        try {
            const res = await fetch(url, request);
            if (!res.ok) throw new Error('Błąd HTTP ' + res.status);
            const data = await res.json();
            return data;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

//const ajax = new Ajax({
//    BaseUrl: 'https://jsonplaceholder.typicode.com',
//});
