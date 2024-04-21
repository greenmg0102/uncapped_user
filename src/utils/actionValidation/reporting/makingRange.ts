import { hero8Site } from '../../reference/playCardColor'

export const makingColdRange = (obj: any) => {

    let real: any = []

    if (obj.RFI !== undefined) {
        let limit = keyExtract(hero8Site, obj.RFI)
        let preRFI = prevRFIallowKey(hero8Site, limit)

        Object.keys(preRFI).forEach((key: any) => {
            if (preRFI[key] === obj.RFI) {
                real.push({
                    position: preRFI[key],
                    action: "R"
                })
            } else {
                real.push({
                    position: preRFI[key],
                    action: "F"
                })
            }
        })
    } else real = []

    if (obj.caller.length !== 0) {
        let limit1 = keyExtract(hero8Site, obj.RFI)
        let limit2 = keyExtract(hero8Site, obj.caller[obj.caller.length - 1])
        let betweenCaller = betweenCallerAllowKey(hero8Site, limit1, limit2)

        Object.keys(betweenCaller).forEach((key: any) => {
            if (obj.caller.some((item: any) => item === betweenCaller[key])) {
                real.push({
                    position: betweenCaller[key],
                    action: "C"
                })
            } else {
                real.push({
                    position: betweenCaller[key],
                    action: "F"
                })
            }
        })
    }

    if (obj.bet3 !== undefined) {

        let limit1 = keyExtract(hero8Site, obj.caller[obj.caller.length - 1])
        let limit2 = keyExtract(hero8Site, obj.bet3)

        let betweenCaller = betweenCallerAllowKey(hero8Site, limit1, limit2)

        Object.keys(betweenCaller).forEach((key: any) => {
            if (betweenCaller[key] === obj.bet3) {
                real.push({
                    position: betweenCaller[key],
                    action: "R"
                })
            } else {
                real.push({
                    position: betweenCaller[key],
                    action: "F"
                })
            }
        })
    }

    if (obj.hero.length !== 0) {

        if (obj.bet3 === "BB") {

            let availableVSSqueeze = objectFromValue(hero8Site, [obj.RFI, ...obj.caller])

            Object.keys(availableVSSqueeze).forEach((key: any) => {
                if (obj.hero.some((item: any) => item === availableVSSqueeze[key])) {
                    real.push({
                        position: availableVSSqueeze[key],
                        action: "H"
                    })
                } else {
                    real.push({
                        position: availableVSSqueeze[key],
                        action: "F"
                    })
                }
            })
        } else {

            let bet3Limit: any = keyExtract(hero8Site, obj.bet3)
            let heroLimit: any = keyExtract(hero8Site, obj.hero[0])

            if (heroLimit < bet3Limit) {
                let limit = keyExtract(hero8Site, obj.bet3)
                let afterCaller = allowKey(hero8Site, limit)
                let availableVSSqueeze = objectFromValue(hero8Site, [obj.RFI, ...obj.caller])

                Object.keys(afterCaller).forEach((key: any) => {
                    if (obj.hero.some((item: any) => item === afterCaller[key])) {
                        real.push({
                            position: afterCaller[key],
                            action: "H"
                        })
                    } else {
                        real.push({
                            position: afterCaller[key],
                            action: "F"
                        })
                    }
                })

                Object.keys(availableVSSqueeze).forEach((key: any) => {
                    if (obj.hero.some((item: any) => item === availableVSSqueeze[key])) {
                        real.push({
                            position: availableVSSqueeze[key],
                            action: "H"
                        })
                    } else {
                        real.push({
                            position: availableVSSqueeze[key],
                            action: "F"
                        })
                    }
                })
            } else {
                let limit = keyExtract(hero8Site, obj.bet3)
                let afterCaller = allowKey(hero8Site, limit)

                Object.keys(afterCaller).forEach((key: any) => {
                    if (obj.hero.some((item: any) => item === afterCaller[key])) {
                        real.push({
                            position: afterCaller[key],
                            action: "H"
                        })
                    } else {
                        real.push({
                            position: afterCaller[key],
                            action: "F"
                        })
                    }
                })
            }
        }
    }

    let heroIndex = real.findIndex((item: any) => item.action === "H")
    let realBuffer = heroIndex === -1 ? real : real.slice(0, heroIndex + 1)

    return realBuffer
}

export const extractingMaximumPosition = (obj: any, array: any): any => {

    let real: any = []
    Object.keys(obj).forEach((key: any) => {
        if (array.some((item: any) => item === obj[key])) real.push(key)
    })
    return obj[Math.max(...real)]
}

export const availableHeroPosition = (squeezeOption: any): any => {

    let availableVSSqueeze = []
    if (squeezeOption.bet3 !== "BB") {

        if (squeezeOption.caller.length === 1) {
            let limit = keyExtract(hero8Site, squeezeOption.bet3)
            let result = allowKey(hero8Site, limit)

            availableVSSqueeze = [squeezeOption.RFI, ...squeezeOption.caller, ...Object.values(result)]
            return objectFromValue(hero8Site, availableVSSqueeze)

        } else {

            availableVSSqueeze = [squeezeOption.RFI, ...squeezeOption.caller]
            return objectFromValue(hero8Site, availableVSSqueeze)
            
        }
    } else {
        availableVSSqueeze = [squeezeOption.RFI, ...squeezeOption.caller]
        return objectFromValue(hero8Site, availableVSSqueeze)
    }
}

export const objectFromValue = (obj: any, array: any) => {
    let real: any = {}

    Object.keys(obj).forEach((key: any) => {
        if (array.some((item: any) => item === obj[key])) {
            real[key] = obj[key]
        }
    })
    return real
}

export const keyExtract = (obj: any, value: any) => {
    let keyNumber;
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop] === value) {
            keyNumber = prop;
            break;
        }
    }
    return keyNumber
}

export const allowKey = (obj: any, value: any) => {
    let real: any = {}
    Object.keys(obj).filter((key: any) => key > value).forEach((item: any) => {
        real[item] = obj[item]
    });
    return real
}

export const prevRFIallowKey = (obj: any, value: any) => {
    let real: any = {}
    Object.keys(obj).filter((key: any) => key <= value).forEach((item: any) => {
        real[item] = obj[item]
    });
    return real
}
export const betweenCallerAllowKey = (obj: any, limit1: any, limit2: any) => {

    let real: any = {}
    Object.keys(obj).filter((key: any) => key > limit1 && key <= limit2).forEach((item: any) => {
        real[item] = obj[item]
    });
    return real
}


export const allowKeyExtracting = (total: any, keyList: any) => {

    let real: any = {}

    Object.keys(total).forEach((key: any) => {
        if (keyList.some((item: any) => item === total[key])) {
            real[key] = total[key]
        }
    })
    return real
}


export const availableExtractingValue = (total: any, target: any) => {

    const availablePostion: any = Object.keys(total)
        .filter(key => !target.includes(key))
        .reduce((obj: any, key: any) => {
            obj[key] = total[key];
            return obj;
        }, {});

    return availablePostion
}

