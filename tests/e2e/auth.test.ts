import { expect, test } from "@playwright/test";

test.describe("Authentication Pages", () => {
  test("hydrates the session without a client fetch error", async ({
    page,
  }) => {
    const sessionRequests: string[] = [];
    const clientFetchErrors: string[] = [];

    page.on("request", (request) => {
      if (request.url().includes("/api/auth/session")) {
        sessionRequests.push(request.url());
      }
    });
    page.on("console", (message) => {
      if (message.text().includes("ClientFetchError")) {
        clientFetchErrors.push(message.text());
      }
    });

    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: "เข้าสู่ระบบผู้ดูแลระบบ" })
    ).toBeVisible();
    expect(sessionRequests).toHaveLength(0);
    expect(clientFetchErrors).toHaveLength(0);
  });

  test("serves the public department logo without authentication", async ({
    page,
  }) => {
    const response = await page.request.get("/logo.jpg");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/jpeg");
  });

  test("admin login page renders correctly", async ({ page }) => {
    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: "เข้าสู่ระบบผู้ดูแลระบบ" })
    ).toBeVisible();
    await expect(page.getByLabel("ชื่อผู้ใช้ (Username)")).toBeVisible();
    await expect(page.getByLabel("รหัสผ่าน (Password)")).toBeVisible();
    await expect(page.getByRole("button", { name: "เข้าสู่ระบบ" })).toBeVisible();
  });

  test("registration page explains registration is closed", async ({
    page,
  }) => {
    await page.goto("/register");
    await expect(
      page.getByRole("heading", { name: "ปิดรับการลงทะเบียน" })
    ).toBeVisible();
    await expect(page.getByText(/ไม่อนุญาตให้บุคคลทั่วไปลงทะเบียน/)).toBeVisible();
    await expect(
      page.getByRole("link", { name: "ไปที่หน้าเข้าสู่ระบบ (Admin Login)" })
    ).toBeVisible();
  });

  test("login page links back to home", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  test("can navigate from registration notice to login", async ({ page }) => {
    await page.goto("/register");
    await page
      .getByRole("link", { name: "ไปที่หน้าเข้าสู่ระบบ (Admin Login)" })
      .click();
    await expect(page).toHaveURL("/login");
  });
});
