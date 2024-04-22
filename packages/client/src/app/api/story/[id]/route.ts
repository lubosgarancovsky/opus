import { handler } from "@/utils/api/axios/server/requestHandler";

export async function PUT(request: Request) {
  return handler(request);
}
