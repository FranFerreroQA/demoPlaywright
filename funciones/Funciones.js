import { expect } from '@playwright/test';

export class Funciones {

    constructor(page) {
        this.page = page;
    }

    async dirigirseA(url) {
        await this.page.goto(url);
    }

    async elementosVisiblesE(elements) {
        for (const { role, name } of elements) {
            await expect(this.page.getByRole(role, { name, exact: true })).toBeVisible();
        }
    }

    async elementosVisiblesR(elements) {
        for (const { role, name } of elements) {
            await expect(this.page.getByRole(role, { name })).toBeVisible();
        }
    }

    async elementosVisiblesL(elements) {
        for (const {locator} of elements) {
            await expect(this.page.locator(locator)).toBeVisible();
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

    async llenarCamposL(elements) {
        for (const { locator, text } of elements) {
            await this.page.locator(locator).fill(text);
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

    async clickLocator(locator) {
        await this.page.locator(locator).click();
    }

    async clickLocators(elements) {
        for (const {locator} of elements) {
            await this.page.locator(locator).click();
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

    async getByLabel(elements) { 
        for (const { label } of elements) {
            await this.page.getByLabel(label);
        }
    }

    async textosNoEsperados(elements) {
        for (const { locator, text } of elements) {
            await expect(this.page.locator(locator)).not.toContainText(text);
        }
    }

    async buscarPorTexto(buscar) {
        await this.page.locator('#translControl1').fill(buscar);
        await this.page.getByLabel('Buscar').click();
    }

    async resultados(buscar) {
        for (const { locator, text, borrar } of buscar) {
            await this.validarTextos([{ locator, text }]);
            await this.clickButtons([ borrar ]);
        }
    }

    async seleccionDropdownP(options) {
        for (const { placeholder, option } of options) {
            await this.page.getByPlaceholder(placeholder).click();
            await this.page.getByRole('button', { name: option, exact: true }).click();
        }
    }

    async seleccionDropdownL(options) {
        for (const { locator, option } of options) {
            await this.page.locator(locator).click();
            await this.page.locator(locator).selectOption(option);
        }
    }

    async verFicha(index) {
        await this.page.locator(`tr:nth-child(${index}) > td:nth-child(9)`).click();
    }

    async checkearCaso(index) {
        await this.page.locator(`tr:nth-child(${index}) > td > .flex`).click();
    }

}


