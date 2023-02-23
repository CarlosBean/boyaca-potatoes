export interface IAccount {
  Status: number;
  Token: string;
  Message: unknown;
  TwoFactorType: unknown;
  AllowedTwoFactorTypes: unknown;
  Permissions: IPermission[];
  Features: IFeature[];
  Locations: unknown[];
  LastLocationId: number;
  Preferences: unknown[];
  UserType: string;
  Email: string;
  FirstName: string;
  LastName: string;
  CompanyName: string;
  TimeZoneInfo: unknown;
  RefreshToken: string;
}

export interface IFeature {
  M: string;
  F: string;
}

export interface IPermission {
  M: string;
  D: string;
}
