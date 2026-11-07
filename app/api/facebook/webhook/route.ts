import { NextResponse } from "next/server";

// Verify Webhook for Meta Developer App
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.FACEBOOK_VERIFY_TOKEN || "itnstru_webhook_secret";

  if (mode === "subscribe" && token === verifyToken) {
    console.log("Facebook Webhook verified successfully!");
    return new Response(challenge, { status: 200 });
  }

  return new Response("Verification token mismatch", { status: 403 });
}

// Receive Real-time updates when page posts
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received Facebook Webhook Event:", JSON.stringify(body, null, 2));

    // Handle Page Feed change event
    if (body.object === "page") {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          if (change.field === "feed") {
            const value = change.value;
            console.log(
              `[IT NSTRU Facebook Sync] New post event detected: ${value.item} (verb: ${value.verb}) - Post ID: ${value.post_id}`
            );
          }
        }
      }
    }

    return NextResponse.json({ status: "EVENT_RECEIVED" });
  } catch (error) {
    console.error("Error processing Facebook webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
