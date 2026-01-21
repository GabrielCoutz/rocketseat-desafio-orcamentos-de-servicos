import { IOrderingFilters } from '@/components/OrderingFilters';
import { IStackRoutes } from '@/routes/StackRoutes';
import { IBudgetStatus } from '@/types/budget';

/* eslint-disable @typescript-eslint/no-empty-object-type */
export type RootStackParamList = {
  home:
    | undefined
    | {
        status: IBudgetStatus[];
        search: string;
        orderBy: IOrderingFilters;
      };
  budget: undefined | { id: string };
  details: { id: string };
  service: undefined | { budgetId: string; serviceId: string };
  filter:
    | undefined
    | {
        status: IBudgetStatus[];
        search: string;
        orderBy: IOrderingFilters;
      };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends IStackRoutes {}
  }
}
