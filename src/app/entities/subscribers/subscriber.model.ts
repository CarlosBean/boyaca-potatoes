export interface ISubscriber {
  SystemId: null;
  Area: string;
  PublicId: number;
  CountryCode: string;
  CountryName: string;
  Name: string;
  Email: string;
  JobTitle: string;
  PhoneNumber: string;
  PhoneCode: string;
  PhoneCodeAndNumber: string;
  LastActivityUtc: null;
  LastActivity: null;
  SubscriptionDate: null;
  SubscriptionMethod: number;
  SubscriptionState: number;
  SubscriptionStateDescription: string;
  Topics: any[];
  Activity: string;
  ConnectionState: number;
  Id: number;
}

export type IEditSubscriber = Pick<
  ISubscriber,
  | 'Id'
  | 'Name'
  | 'Email'
  | 'CountryCode'
  | 'PhoneNumber'
  | 'JobTitle'
  | 'Area'
  | 'Topics'
>;

export type INewSubscriber = Omit<IEditSubscriber, 'id'>;
