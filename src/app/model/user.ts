export class User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  role: number;
  avatar: string;
  currency: string;
  timezone: string;
  language: string;
  locale: Date;
  card_number: string;
  customer_count?: number;
  demo?: number;
  expires_at?: string;
  plan_id?: string;
  plan_name?: string;
  available_points?: number;
  balance?: number;
  verification_code?: string;
  email_verified_at?: string;
}
