/**
 * Tester type. Could be used in future implementation that allows for uploading to database.
 */
export interface Tester {
  testerId: number;
  firstName: string;
  lastName: string;
  country: string;
  lastLogin: Date;
}
