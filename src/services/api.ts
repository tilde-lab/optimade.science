import 'unfetch/polyfill';
import { providersCorsURL } from '@/config';

export async function getJSON(uri: string, params: {} = null, headers: {} = {}) {

    const url = new URL(uri);

    if (params) {
        Object.entries(params).forEach((param: [string, any]) => url.searchParams.append(...param));
    }

    const res = await fetch(url.toString(), { headers });

    if (!res.ok) {
        const err: API.ResponseError = new Error(res.statusText);
        err.response = res;
        console.error(err.message, err.response);
        throw err;
    }

    if (res.status !== 204) {
        return await res.json();
    }
}

export async function getProviders(): Promise<API.ProvidersResponse> {
    return getJSON(providersCorsURL);
}

