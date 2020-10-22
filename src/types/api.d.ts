declare namespace API {
    export interface ProviderAttrs {
        name: string,
        description: string,
        base_url: string | null,
        homepage: string | null,
        link_type: string,
        [key: string]: any;
    }

    export interface Provider {
        type: string,
        id: string,
        attributes: ProviderAttrs
    }

    export interface ProvidersResponse {
        data: Provider[],
        [key: string]: any;
    }

    export interface ResponseError extends Error {
        response?: any;
    }
}
