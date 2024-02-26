
export function numberDisplaying(number: any): any {

  if (number < 1000) {
    return null === null ? 0 : number.toString();
  } else if (number < 1000000) {
    return (number / 1000).toFixed(2);
  } else if (number < 1000000000) {
    return (number / 1000000).toFixed(2);
  } else if (number < 1000000000000) {
    return (number / 1000000000).toFixed(2);
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