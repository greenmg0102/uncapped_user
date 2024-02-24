
export function scatterGet(main: any, user: any, action: any, type: any): any {

    let real: any = {}
    let series: any = []

    user.forEach((item: any) => {

        let currentFocus = series.findIndex((each: any) => each.name === item.position)

        if (currentFocus === -1) {

            let bufferList: any = {}
            bufferList.type = 'rangeArea'
            bufferList.name = item.position

            let bufferData: any = []

            if (item.position === bufferList.name) {

                let ydeviation: any = [0, 0]

                let mainDataCorresponding = main.find((item: any) => item.position === item.position && item.stack === item.stack).handResult
                let userFrenquency = userDataAnalysis(item.handResult, type)
                let mainFrenquency = mainDataAnalysis(mainDataCorresponding, type)

                ydeviation[0] = Math.floor(userFrenquency * 10000) / 100
                ydeviation[1] = Math.floor(mainFrenquency * 10000) / 100

                bufferData.push({
                    x: item.stack.toString() === "398750" ? "40" : item.stack.toString(),
                    y: ydeviation
                })
            }

            bufferList.data = bufferData
            series.push(bufferList)

        } else {

            let currentData = series[currentFocus].data
            let ydeviation: any = [0, 0]

            let mainDataCorresponding = main.find((item: any) => item.position === item.position && item.stack === item.stack).handResult
            let userFrenquency = userDataAnalysis(item.handResult, type)
            let mainFrenquency = mainDataAnalysis(mainDataCorresponding, type)

            ydeviation[0] = Math.floor(userFrenquency * 10000) / 100
            ydeviation[1] = Math.floor(mainFrenquency * 10000) / 100

            currentData.push({
                x: item.stack.toString(),
                y: ydeviation
            })
            series[currentFocus].data = currentData;
        }
    })

    real.series = series

    return real
}

export function userDataAnalysis(hand: any, type: any): any {


    let lenght = Object.keys(hand).length
    let total = 0

    Object.keys(hand).forEach((item: any) => {

        const sum: number = Object.values(hand[item].frequency).reduce((acc: number, curr: any) => acc + curr, 0);
        total += hand[item].frequency[type] / sum;
    });

    return Number.isNaN(Number(total / lenght)) ? 0 : Number(total / lenght)
}

export function mainDataAnalysis(hand: any, type: any): any {

    let lenght = Object.keys(hand).length
    let total = 0

    Object.keys(hand).forEach((item: any) => {

        const sum: number = hand[item].played[2]
        total += sum;
    });

    return Number.isNaN(Number(total / lenght)) ? 0 : Number(total / lenght)
}