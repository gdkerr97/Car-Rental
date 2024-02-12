import { BookStatusEnum } from "./bookstatus";

export class BookDTO{
    id?: number;
    fromDate?: Date;
    toDate?: Date;
    days?: number;
    price?: number;
    bookStatus?: BookStatusEnum;
    userId?: number;
    carId?: number;
    username?: string;
    email?: string;
}