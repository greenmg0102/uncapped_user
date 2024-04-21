import axios from "axios";

export async function heroRaisingSize(data: any): Promise<any> {
    const result = await axios.post('report/raise-sizing/hero', data).then((result: any) => { return result.data })
    return result
}

export async function villainRaisingSize(data: any): Promise<any> {
    const result = await axios.post('report/raise-sizing/villain', data).then((result: any) => { return result.data })
    return result
}

export async function raisingSizeTabelExtracting(data: any): Promise<any> {
    const result = await axios.post('report/raise-sizing/raisingSizeTabelExtracting', data).then((result: any) => { return result.data })
    return result
}