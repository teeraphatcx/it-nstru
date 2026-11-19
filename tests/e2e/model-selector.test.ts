import { expect, test } from "@playwright/test";

test.describe("Portal navigation", () => {
  test("shows the public navigation and admin entry point", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: "เทคโนโลยีสารสนเทศ" })
    ).toHaveAttribute("href", "#hero");
    await expect(
      page.getByRole("link", { name: "เข้าสู่ระบบแอดมิน (หลังบ้าน)" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "สลับธีม" })).toBeVisible();
  });

  test("opens the mobile navigation menu", async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/");

    await page.getByRole("button", { name: "Toggle menu" }).click();
    const header = page.getByRole("banner");
    await expect(header.getByRole("link", { name: "หน้าแรก" })).toBeVisible();
    await expect(header.getByRole("link", { name: "ติดต่อเรา" })).toBeVisible();
  });

  test("links to the full-screen AI chat", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "โหมดเต็มจอ" })).toHaveAttribute(
      "href",
      "/chat"
    );
  });
});
