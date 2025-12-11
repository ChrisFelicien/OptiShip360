type JwtPayload = {
  id: string;
  role?: string;
  iat?: number;
};

export default JwtPayload;
