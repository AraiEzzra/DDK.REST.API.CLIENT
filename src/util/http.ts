export enum HTTP_STATUS {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export const isValidURL = (url: string): boolean => {
    const res = url.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return res !== null;
};

export const parseUrls = (rawUrls: string): Array<string> => {
    if (!rawUrls) {
        return [];
    }

    return rawUrls.split(',').filter(url => {
        if (!isValidURL(url)) {
            console.error(`[Error][extractUrls] url: ${url} is invalid`);
            return false;
        }
        return true;
    });
};
