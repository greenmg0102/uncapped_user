import axios from "axios";

export async function scatterChart(data: any): Promise<any> {
    const result = await axios.post("report-stastic/scatter", data).then((result: any) => { return result.data })
    return result
}


export async function globalStatistic(data: any): Promise<any> {
    const result = await axios.post("report-stastic/global-statistic", data).then((result: any) => { return result.data })
    return result
}