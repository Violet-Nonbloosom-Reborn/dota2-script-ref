export interface Enum {
  name: string;
  members: EnumMember[];
}

export interface EnumMember {
  name: string;
  description?: string;
  value: number;
}
