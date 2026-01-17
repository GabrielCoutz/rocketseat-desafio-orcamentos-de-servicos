/* eslint-disable @typescript-eslint/no-empty-object-type */
export type RootStackParamList = {
  home: undefined;
  budget: undefined | { id: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
