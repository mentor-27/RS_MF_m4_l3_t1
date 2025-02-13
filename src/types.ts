export interface IData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IUseFetch {
  data: IData[];
  isLoading: boolean;
  error: boolean;
  refetch: ({ params }: { params: object }) => Promise<void>;
}
