export class History {
  id: number;
  uuid: string;
  account_id: number;
  event_id: number;
  program_id: number;
  business_id?: number;
  currency_id?: number;
  location_id?: number;
  customer_id?: number;
  // program?: Program;
  // event?: Event;
  currency?: string;
  point: number;
  shopping_value: number;
  color?: string;
  first_purchase?: boolean;
  force_point?: boolean;
  icon?: string;
  icon_size?: string;
  is_guest?: boolean;
  is_redeem?: boolean;
  // items?: Item[];
  created_by?: number;
  created_at?: string;
  deleted_by?: number;
  deleted_at?: string;

}
