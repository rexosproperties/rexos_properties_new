import { auth } from "@/lib/auth";
import { signUpload } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const folder =
    typeof body.folder === "string" && body.folder
      ? `rexos/${body.folder}`
      : "rexos/uploads";

  return NextResponse.json(signUpload(folder));
}
