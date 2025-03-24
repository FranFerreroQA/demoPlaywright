import { expect } from '@playwright/test';

export class Funciones {

    constructor(page) {
        this.page = page;
    }

    async dirigirseA(url) {
        await this.page.goto(url);
    }

    async elementosVisibles(elements) {
        for (const { role, name } of elements) {
            await expect(this.page.getByRole(role, { name, exact: true })).toBeVisible();
        }
    }

    async elementosVisiblesB(elements) {
        for (const { role, name } of elements) {
            await expect(this.page.getByRole(role, { name })).toBeVisible();
        }
    }

    async elementosNoEsperados(elements) {
        for (const { role, name } of elements) {
            await expect(this.page.getByRole(role, { name })).not.toBeVisible();
        }
    }

    async llenarCampos(elements) {
        for (const { placeholder, text } of elements) {
            await this.page.getByRole('textbox', { name: placeholder }).fill(text);
        }
    }

    async clickButtons(buttonNames) {
        for (const name of buttonNames) {
            await this.page.getByRole('button', { name, exact: true }).click();
        }
    }

    async clickButtonsB(buttonNames) {
        for (const name of buttonNames) {
            await this.page.getByRole('button', { name }).click();
        }
    }

    async loguearse(credenciales, buttonName) {
        await this.llenarCampos(credenciales);
        await this.clickButtons(buttonName);
    }

    async validarTextos(elements) {
        for (const { locator, text } of elements) {
            await expect(this.page.locator(locator)).toContainText(text);
        }
    }

    async getByText(elements) { 
        for (const { text } of elements) {
            await this.page.getByText(text);
        }
    }

    async textosNoEsperados(elements) {
        for (const { locator, text } of elements) {
            await expect(this.page.locator(locator)).not.toContainText(text);
        }
    }

    async resultados(buscar) {
        for (const { locator, text, borrar } of buscar) {
            await this.validarTextos([{ locator, text }]);
            await this.clickButtons([ borrar ]);
        }
    }

    async seleccionDropdown(options) {
        for (const { placeholder, option } of options) {
            await this.page.getByPlaceholder(placeholder).click();
            await this.page.getByRole('button', { name: option, exact: true }).click();
        }
    }

    async verFicha(index) {
        await this.page.locator(`tr:nth-child(${index}) > td:nth-child(9)`).click();
    }

    async checkearCaso(index) {
        await this.page.locator(`tr:nth-child(${index}) > td > .flex`).click();
    }

}


