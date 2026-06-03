import { auth } from "@/lib/auth";
import { signUpload } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Validate Cloudinary credentials are configured on the server
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: "Cloudinary is not configured (missing CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET)" },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const folder =
    typeof body.folder === "string" && body.folder
      ? `rexos/${body.folder}`
      : "rexos/uploads";

  return NextResponse.json(signUpload(folder));
}
