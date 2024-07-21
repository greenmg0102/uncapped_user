export const maceDate = (dateList: any, y: any, x: any): any => {

    let count: any = []
    let xAxios: any = []

    dateList.forEach((item: any) => {
        count.push(item[y])
        xAxios.push(item[x])
    })

    return {
        count: count,
        xAxios: xAxios
    }
};

export const nowDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDay = currentDate.toISOString().split('T')[0];

    return nextDay
}