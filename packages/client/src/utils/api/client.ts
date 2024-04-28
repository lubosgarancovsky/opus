type Result = {
  status: number;
  data: any;
};

export const resolve = async (promise: Promise<Result>) => {
  const result = await promise;

  if (result.data.status > 299) {
    throw new Error(result.data);
  }

  return result.data.data;
};
