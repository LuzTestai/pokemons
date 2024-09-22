type UserCredentials = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

type UserData = {
  user: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  };
};

export type { UserCredentials, UserData };
