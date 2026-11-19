import { expect, test } from "@playwright/test";

test.describe("IT NSTRU portal", () => {
  test("loads the public department homepage", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /ระบบปัญญาประดิษฐ์เพื่อการประชาสัมพันธ์/,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /โครงสร้างหลักสูตร/ })
    ).toHaveAttribute("href", "#curriculum");
    await expect(page.locator("#ai-system")).toBeVisible();
  });

  test("renders the AI question input", async ({ page }) => {
    await page.goto("/");
    const input = page.getByPlaceholder(
      "พิมพ์คำถามเกี่ยวกับหลักสูตร IT มรภ.นครศรีธรรมราช..."
    );
    await expect(input).toBeVisible();
    await input.fill("หลักสูตรมีกี่หน่วยกิต?");
    await expect(input).toHaveValue("หลักสูตรมีกี่หน่วยกิต?");
  });

  test("opens and closes the floating AI chat", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "เปิดแชทกับ AI" }).click();
    await expect(page.getByText("IT NSTRU Chatbot")).toBeVisible();
    await expect(page.getByPlaceholder("ถามข้อมูลหลักสูตร IT...")).toBeVisible();

    await page.getByTitle("ปิดหน้าต่าง").click();
    await expect(page.getByText("IT NSTRU Chatbot")).not.toBeVisible();
  });
});
