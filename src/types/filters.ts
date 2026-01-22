import { IOrderingFilters } from '@/components/OrderingFilters';
import { IBudgetStatus } from '@/types/budget';

export interface IFilters {
  status?: IBudgetStatus[];
  orderBy?: IOrderingFilters;
  search?: string;
}
