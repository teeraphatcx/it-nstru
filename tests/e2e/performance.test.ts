import { expect, test } from "@playwright/test";

test("defers Facebook feed requests until the news cards are opened", async ({
  page,
}) => {
  const feedRequests: string[] = [];

  page.on("request", (request) => {
    if (request.url().includes("/api/facebook/feed")) {
      feedRequests.push(request.url());
    }
  });

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "ข่าวสารและกิจกรรมล่าสุดจากเพจ IT NSTRU" })
  ).toBeAttached();
  expect(feedRequests).toHaveLength(0);

  await page
    .getByRole("button", { name: "การ์ดข่าวสารระบบ (News Grid)" })
    .click();
  await expect.poll(() => feedRequests.length).toBeGreaterThan(0);
});
