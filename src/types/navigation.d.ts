/* eslint-disable @typescript-eslint/no-empty-object-type */
export type RootStackParamList = {
  home: undefined;
  budget: undefined | { id: string };
  service: undefined | { budgetId: string; serviceId: string };
  filter: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
