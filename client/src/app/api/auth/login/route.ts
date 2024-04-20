export const POST = async (request: Request, response: Response) => {
  const body = await request.json();

  return Response.json({ body });
};
