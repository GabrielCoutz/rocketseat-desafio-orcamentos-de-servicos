export type IBudgetStatus = 'pending' | 'approved' | 'rejected' | 'sended';

export interface IQuoteDocItem {
  id: string;
  title: string;
  description: string;
  qty: number;
  price: number;
}

export interface IQuoteDoc {
  id: string;
  client: string;
  title: string;
  items: IQuoteDocItem[];
  discountPct?: number;
  status: IBudgetStatus;
  createdAt: string;
  updatedAt: string;
}
