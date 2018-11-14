import { AccountType } from '../../shared/models';

export interface LoginUser {
  account: string;
  domainid: string;
  firstname: string;
  lastname: string;
  registered: string;
  sessionkey: string;
  timeout: number;
  timezone: string;
  timezoneoffset: string;
  type: AccountType;
  userid: string;
  username: string;
}
