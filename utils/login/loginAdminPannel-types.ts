export type LoginResponse = {
  uuid: string;
  token: string;
  token_type: number;
  token_type_translation: string;
  ip?: string;
  agent?: string;
  login_url: string;
  renderer_token?: string;
  last_activity?: string;
  expires_at?: string;
  created_at?: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    is_super_business?: boolean;
  };
  business?: {
    id: number | null;
    v3_id: number | null;
    name: string | null;
  };
  sub_businesses?: any[];
}
