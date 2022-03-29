import { genSalt, hash, compare } from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const isPasswordEqual = async (password: string, hashPass: string): Promise<boolean> => {
  return await compare(password, hashPass);
};
