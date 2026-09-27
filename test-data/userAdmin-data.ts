export type TestUser = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "admin" | "merchant";
  mobile: string;
};

export const users: TestUser[] = [
  {
    id: 1,
    password: "654321",
    email: "tinafarighi75@gmail.com",
    name: "تینا فریقی",
    role: "admin",
    mobile: "09398063471",
  },
];
