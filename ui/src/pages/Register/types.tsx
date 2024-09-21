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
    // Supongamos que el backend retorna estos campos
  };
};

export type { UserCredentials, UserData };
