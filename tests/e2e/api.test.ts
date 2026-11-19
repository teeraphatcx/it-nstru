import { expect, test } from "@playwright/test";

test.describe("Portal smart-reply API", () => {
  test("returns a smart reply for a valid question", async ({ request }) => {
    const response = await request.post("/api/portal/smart-reply", {
      data: { message: "หลักสูตรกี่หน่วยกิต?" },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.reply).toEqual(expect.any(String));
    expect(body.reply.length).toBeGreaterThan(0);
    expect(body.suggestions).toEqual(expect.any(Array));
  });

  test("rejects an empty question", async ({ request }) => {
    const response = await request.post("/api/portal/smart-reply", {
      data: { message: "" },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toEqual(expect.any(String));
  });
});
