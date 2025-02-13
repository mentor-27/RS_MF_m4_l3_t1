export interface IData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IUseFetch {
  data: object[];
  isLoading: boolean;
  error: boolean;
  refetch: () => void;
}
