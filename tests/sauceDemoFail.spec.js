import { test } from '@playwright/test';
import { Funciones } from '../funciones/Funciones';

// Variables - Datos de prueba

const url = 'https://www.saucedemo.com/';
const username = 'standard_user';
const password = 'secret_sauce';

// Test
test('Sauce Demo Playwright', async ({ page }) => {

    const f = new Funciones(page);

    // Login
    await test.step('Login', async () => {

        await f.dirigirseA(url);
        await f.elementosVisiblesL([
            { locator: '[data-test="username"]' },
            { locator: '[data-test="password"]' },
            { locator: '[data-test="login-button"]' }
        ]);
        await f.getByText([{ text: 'Swag Labs' }]);
        await f.loguearse([
            { placeholder: 'Username', text: username },
            { placeholder: 'password', text: password }],
            ['Login' ]);

    });

    // Verificar elementos
    await test.step('Verificar elementos', async () => {

        await f.elementosVisiblesL([
            { locator: '[data-test="title"]' },
            { locator: '[data-test="shopping-cart-link"]' },
            { locator: '[data-test="product-sort-container"]' },
            { locator: '[data-test="inventory-list"]'},
            { locator: '[data-test="footer-copy"]' },
            { locator: '[data-test="footer"]' },
            { locator: '[data-test="social-twitter"]' },
            { locator: '[data-test="social-facebook"]' },
            { locator: '[data-test="social-linkedin"]' }
        ]);
        await f.elementosVisiblesR([
            { role: 'button', name: 'Open Menu' }
        ]);
        await f.validarTextos([
            {locator: '[data-test="title"]', text: 'Products'},
            {locator: '[data-test="product-sort-container"]', text: 'Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)'},
            {locator: '[data-test="footer-copy"]', text: '© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy'}
        ]);

    });

    // Ordenar productos
    await test.step('Ordenar productos', async () => {

        await f.seleccionDropdownL([
            { locator: '[data-test="product-sort-container"]', option: 'az'},
            { locator: '[data-test="product-sort-container"]', option: 'za'},
            { locator: '[data-test="product-sort-container"]', option: 'lohi'},
            { locator: '[data-test="product-sort-container"]', option: 'hilo'},
        ]);

    });

    // Realizar compra
    await test.step('Realizar compra', async () => {

        await f.clickLocators([
            { locator: '[data-test="add-to-cart-sauce-labs-backpack"]' },
            { locator: '[data-test="add-to-cart-sauce-labs-bike-light"]' },
            { locator: '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]' },
            { locator: '[data-test="add-to-cart-sauce-labs-fleece-jacket"]' },
            { locator: '[data-test="add-to-cart-sauce-labs-onesie"]' },
            { locator: '[data-test="shopping-cart-link"]' },
            { locator: '[data-test="checkout"]' }
        ]);
        await f.elementosVisiblesL([
            { locator: '.checkout_info' },
            { locator: '[data-test="firstName"]' },
            { locator: '[data-test="lastName"]' },
            { locator: '[data-test="postalCode"]' },
            { locator: '[data-test="cancel"]' },
            { locator: '[data-test="continue"]' }
        ]);
        await f.validarTextos([
            { locator: '[data-test="title"]', text: 'Checkout: Your Information' }
        ]);
        await f.llenarCampos([
            { placeholder: 'First Name', text: 'Juan' },
            { placeholder: 'Last Name', text: 'Perez' },
            { placeholder: 'Postal Code', text: '1234' }
        ]);
        await f.clickLocator('[data-test="continue"]');
        await f.validarTextos([
            { locator: '[data-test="title"]', text: 'Checkout: Overview' }
        ]);
        await f.getByText([
            { text: 'Sauce Labs Backpackcarry.' },
            { text: 'Sauce Labs Bike LightA red' }
        ]);
        await f.elementosVisiblesL([
            { locator: '[data-test="payment-info-label"]' },
            { locator: '[data-test="shipping-info-label"]' },
            { locator: '[data-test="total-info-label"]' },
            { locator: '[data-test="total-label"]' },
            { locator: '[data-test="cancel"]' },
            { locator: '[data-test="finish"]' }
        ]);
        await f.clickLocator('failTest');
        await f.validarTextos([
            { locator: '[data-test="title"]', text: 'Checkout: Complete!' },
            { locator: '[data-test="complete-text"]', text: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!' },
            { locator: '[data-test="complete-header"]', text: 'Thank you for your order!' }
        ]);
        await f.elementosVisiblesL([   
            { locator: '[data-test="pony-express"]' },
            { locator: '[data-test="complete-header"]' },
            { locator: '[data-test="complete-text"]' },
            { locator: '[data-test="back-to-products"]' }
        ]);
        await f.clickLocator('[data-test="back-to-products"]');
        await f.validarTextos([
            { locator: '[data-test="title"]', text: 'Products' }
        ]);

    });
 
    // Verificar menu
    await test.step('Verificar menu', async () => {
        
        await f.clickButtons(['Open Menu']);
        await f.elementosVisiblesL([
            { locator: '[data-test="inventory-sidebar-link"]' },
            { locator: '[data-test="about-sidebar-link"]' },
            { locator: '[data-test="logout-sidebar-link"]' },
            { locator: '[data-test="reset-sidebar-link"]' }
        ]);

    });
    
    // Cerrar sesión    
    await test.step('Cerrar sesión', async () => { 

        await f.clickLocator('[data-test="logout-sidebar-link"]');
        await f.elementosVisiblesL([
            { locator: '[data-test="username"]' },
            { locator: '[data-test="password"]' },
            { locator: '[data-test="login-button"]' }
        ]);

    });

});