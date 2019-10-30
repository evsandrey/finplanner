import TimeConstants from "./TimeConstants"
export {};

declare global {
  interface Date {
    // common
    addDays(days: number, useThis?: boolean): Date;
    isToday(): boolean;
    clone(): Date;
    isWeekend(): boolean;
    isSameDate(date: Date): boolean;
    // Month
    getStartOfMonth(): Date;
    getDaysInMonth(): number;
    getDayOfMonth(): number;
    getDaysTillTheEndOfMonth() :number ;
    // Year
    getDaysInTheYear(): number;
    getDayOfTheYear(): number;
    getDaysTillTheEndOffYear(): number;
    isLeapYear(): boolean;
  }
}

// Month
Date.prototype.getStartOfMonth = function(): Date  {
  return new Date(
    this.getFullYear(),
    this.getMonth(),
    1
  );
};


Date.prototype.getDaysInMonth = function(): number  {
  return new Date(
    this.getFullYear(),
    this.getMonth() + 1,
    0
  ).getDate() as number;
};

Date.prototype.getDayOfMonth = function(): number  {
  return this.getDate();
};

Date.prototype.getDaysTillTheEndOfMonth = function(): number  {
  return this.getDaysInMonth(this) - this.getDayOfMonth(this);
};

// Year
Date.prototype.getDaysInTheYear = function(): number  {
  let days: number = this.isLeapYear(this) ? 366 : 365;
  return days;
};

Date.prototype.getDayOfTheYear = function(): number  {
  let start = new Date(this.getFullYear(), 0, 0);
  return Math.floor((this.getTime() - start.getTime()) / TimeConstants.DAY);
};

Date.prototype.getDaysTillTheEndOffYear = function(): number  {
  return this.getDaysInTheYear(this) - this.getDayOfTheYear(this);
};

Date.prototype.isLeapYear = function(): boolean  {
  let year = this.getFullYear();
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
};

Date.prototype.addDays = function(days: number): Date {
  if (!days) return this;
  let date = this;
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.isToday = function(): boolean {
  let today = new Date();
  return this.isSameDate(today);
};

Date.prototype.clone = function(): Date {
  return new Date(+this);
};

Date.prototype.isWeekend = function(): boolean {
  return this.getDay() === 0 || this.getDay() === 6;
};
