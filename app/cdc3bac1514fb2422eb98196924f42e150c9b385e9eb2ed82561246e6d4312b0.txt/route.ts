const TOKEN = "cdc3bac1514fb2422eb98196924f42e150c9b385e9eb2ed82561246e6d4312b0";

export function GET() {
  return new Response(TOKEN, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
