import { generateRandomDigits } from "../../tools/generators.ts";


export function makeSvgCaptcha() {

  const code = generateRandomDigits(6);

  const captcha = {
    text: code,
    svgContext: `<svg viewBox="0 0 200 44"><text x="55" y="20">${code}</text></svg>`
  }

  return {
    text: captcha.text,
    svg: captcha.svgContext
  };

}
