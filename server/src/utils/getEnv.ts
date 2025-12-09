const getEnv = (key: string, defaultValue: string = ""): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Sorry, ${key} variable was not provided in env file`);
  }

  return value ? value : defaultValue;
};

export default getEnv;
