const { test, expect } = require('@playwright/test');
const prisma = require('../../lib/prisma');
test('visitor browses, creates a demo account, and saves an order', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    let userId;
    try {
        await page.goto('/');
        await expect(page.getByRole('region', { name: 'Newest collection' })).toBeVisible();
        const product = page.getByRole('button', { name: /Aaliyah Graphic Tee/ });
        await expect(product).toBeVisible();
        if (process.env.CAPTURE_SCREENSHOTS) await page.screenshot({ path: 'docs/storefront.png', fullPage: true });
        await product.click();
        await page.reload();
        await expect(page.getByRole('heading', { name: 'Aaliyah Graphic Tee' })).toBeVisible();
        await page.getByRole('button', { name: 'md', exact: true }).click();
        await page.getByRole('button', { name: 'add to bag' }).click();
        await page.locator('a[href="/cart"]').first().click();
        await expect(page.getByText('Your Bag: 1 Items')).toBeVisible();
        await page.reload();
        await expect(page.getByText('Your Bag: 1 Items')).toBeVisible();
        await page.goto('/login');
        await page.getByRole('button', { name: 'Try Demo Account' }).click();
        await expect(page).toHaveURL('/');
        userId = await page.evaluate(() => JSON.parse(localStorage.getItem('user')).id);
        await page.goto('/account');
        await page.getByText('Addresses', { exact: true }).click();
        await expect(page.getByText('You dont have an address saved currently')).toBeVisible();
        await page.goto('/checkout');
        await page.locator('input[name="street"]').fill('123 Demo Street');
        await page.locator('input[name="city"]').fill('New York');
        await page.locator('input[name="zip"]').fill('10001');
        await page.locator('select[name="state"]').selectOption({ label: 'New York' });
        await page.getByRole('checkbox').check();
        if (process.env.CAPTURE_SCREENSHOTS) await page.screenshot({ path: 'docs/checkout.png', fullPage: true });
        // A failed request must preserve the cart and keep the user on checkout.
        await page.route('**/api/orders/placeOrder', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Please try again' }) }));
        await page.getByRole('button', { name: 'Place Demo Order' }).click();
        await expect(page.getByText('Please try again', { exact: true })).toBeVisible();
        await expect(page).toHaveURL('/checkout');
        await page.unroute('**/api/orders/placeOrder');
        await page.getByRole('button', { name: 'Place Demo Order' }).click();
        await expect(page).toHaveURL('/');
        await page.goto('/account');
        await page.getByText('Orders', { exact: true }).click();
        await expect(page.getByText(/Order ID:/)).toBeVisible();
        await expect(page.getByText('Total: $42.09', { exact: true })).toBeVisible();
        await page.getByText('Addresses', { exact: true }).click();
        await expect(page.getByText('123 Demo Street', { exact: true })).toBeVisible();
        await page.goto('/cart');
        await expect(page.getByText('No Items Yet')).toBeVisible();
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/');
        await expect(product).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        expect(errors).toEqual([]);
    } finally {
        if (userId) {
            await prisma.order.deleteMany({ where: { userId } });
            await prisma.address.deleteMany({ where: { userId } });
            await prisma.user.delete({ where: { id: userId } });
        }
        await prisma.$disconnect();
    }
});
