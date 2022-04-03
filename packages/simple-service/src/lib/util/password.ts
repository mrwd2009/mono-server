import { genSalt, hash, compare } from 'bcryptjs';
import zxcvbn from 'zxcvbn';
import config from '../../config/config';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const isPasswordEqual = async (password: string, hashPass: string): Promise<boolean> => {
  return await compare(password, hashPass);
};

// reference https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffleArray = (srcArray: string[]) => {
  let currentIndex = srcArray.length;
  let val = null;
  let randomIndex = 0;

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    val = srcArray[currentIndex];
    srcArray[currentIndex] = srcArray[randomIndex];
    srcArray[randomIndex] = val;
  }

  return srcArray;
};

export const charsInRange = (start: string, end: string) => {
  let startIndex = start.charCodeAt(0);
  const endIndex = end.charCodeAt(0);
  const result = [];

  while (startIndex <= endIndex) {
    result.push(String.fromCharCode(startIndex));
    startIndex += 1;
  }
  return result;
};

export const randomPassword = () => {
  const uppercase = charsInRange('A', 'Z');
  const lowercase = charsInRange('a', 'z');
  const digit = charsInRange('0', '9');
  const special = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');
  const whole = uppercase.concat(lowercase, digit, special);

  const randomGet = (srcArray: string[], count: number) => {
    const result: string[] = [];
    while (count > 0) {
      result.push(srcArray[Math.floor(Math.random() * srcArray.length)]);
      count -= 1;
    }
    return result;
  };
  const expectedLen = 11 + Math.floor(Math.random() * 5);
  const getPassword = () => {
    return shuffleArray(
      randomGet(uppercase, 1).concat(
        randomGet(lowercase, 1),
        randomGet(digit, 1),
        randomGet(special, 1),
        randomGet(whole, expectedLen - 4),
      ),
    ).join('');
  };
  let password = getPassword();
  let loopCount = 0;
  const { score, randomPasswordLoop } = config.auth.zxcvbn;
  while (zxcvbn(password).score < score && loopCount < randomPasswordLoop) {
    password = getPassword();
    loopCount++;
  }
  return password;
};
