import { handler } from "@/utils/api/axios/server/requestHandler";

export async function DELETE(request: Request) {
  return handler(request);
}
