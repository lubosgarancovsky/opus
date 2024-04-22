import { handler } from "@/utils/api/axios/server/requestHandler";

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
