import axios from "axios";

export async function join(data: any): Promise<any> {
    const result = await axios.post('auth/mail/login', data).then((result: any) => { return result.data })
    return result
}
