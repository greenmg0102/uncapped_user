
export function numberDisplaying(number: any): any {

  let realNumber = Number(number)

  if (realNumber < 1000) {
    return null === null ? 0 : realNumber.toString();
  } else if (realNumber < 1000000) {
    return (realNumber / 1000).toFixed(2);
  } else if (realNumber < 1000000000) {
    return (realNumber / 1000000).toFixed(2);
  } else if (realNumber < 1000000000000) {
    return (realNumber / 1000000000).toFixed(2);
  } else {
    return 1000000000;
  }
}

export function numberDacking(number: any): any {
  if (number < 1000) {
    return "";
  } else if (number < 1000000) {
    return "K";
  } else if (number < 1000000000) {
    return "M";
  } else if (number < 1000000000000) {
    return "B";
  } else {
    return "More";
  }
}