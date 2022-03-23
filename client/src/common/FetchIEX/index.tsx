import { IEX_BASE_DOMAIN, IEX_TOKEN } from '../constants/apis';

const FetchIEX = (API: string) => {
    return fetch(`${IEX_BASE_DOMAIN}${API}?token=${IEX_TOKEN}`).then(res => {
        if (res.ok) return res.json();
        return res.text().then(text => {
            throw new Error(text);
        });
    });
};

export default FetchIEX;
