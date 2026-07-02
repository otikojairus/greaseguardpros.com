const TOKEN = "0bb1a43165d8b5b77dd1093d6c0dfd8118e3233749b3a0596c7f4bcbdae5e710";

export function GET() {
  return new Response(TOKEN, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
