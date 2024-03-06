import axios from "axios";

export async function notificationRead(data: any): Promise<any> {
    const result = await axios.post("notification/read", data).then((result: any) => { return result.data })
    return result
}

