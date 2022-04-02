function convertNow(unit: string, temp: number): string {
  switch (unit) {
    //to fahrenheit
    case 'f':
      return `${Math.round(cTof(temp))}°F`;
    //to celsius
    case 'c':
      return `${Math.round(fToc(temp))}°C`;

    default:
      break;
  }
}

function cTof(fahrenheit: number): number {
  return fahrenheit;
}
function fToc(fahrenheit: number): number {
  let celsius = (fahrenheit - 32) / 1.8;
  return celsius;
}
function meanTemp(max: number, min: number): number {
  let mean = (max + min) / 2;
  return mean;
}
export { meanTemp, convertNow };
