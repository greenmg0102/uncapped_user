import jwt_decode from 'jwt-decode';

export const accessTokenDecode = (token: any): string => {
    const { sub } = jwt_decode(token) as { sub: { _id: string } };
    return sub._id;
};

export const expireTimeDecode = (token: any) => {
    const decodiedData: any = jwt_decode(token);
    const todayTimestamp = Date.now() / 1000;

    if(decodiedData.exp < todayTimestamp) return false
    else return true
};