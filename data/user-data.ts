export type UserData = {
  username: string;
  password: string;
};

export function createUniqueUser(): UserData {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 10_000);

  return {
    username: `manoelqa_${timestamp}_${randomSuffix}`,
    password: 'teste@12345',
  };
}