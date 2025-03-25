import { test } from '@playwright/test';
import { Funciones } from '../funciones/Funciones';

// Variables - Datos de prueba

const url = 'https://bcra.koha.theke.io/';
const username = 'username';
const password = 'password';
const buscar = ['Convergencia', 'Planificar', 'Borges', 'Guerra', '1234'];

// Test
test('Biblioteca BCRA Playwright', async ({ page }) => {

    const f = new Funciones(page);

    // Verificar elementos English
    await test.step('Verificar elementos English', async () => {

        await f.dirigirseA(url);
        await f.elementosVisiblesL([
            { locator: '#opacheader' },
            { locator: '#masthead_search' },
            { locator: '#translControl1' },
            { locator: '#navigation'}
        ]);
        await f.elementosVisiblesR([
            { role: 'link', name: 'Koha online' },
            { role: 'link', name: 'Log in to your account' },
            { role: 'link', name: 'Search history' },
            { role: 'link', name: 'Clear' },
            { role: 'button', name: 'Lists' },
            { role: 'button', name: 'Languages' },
            { role: 'heading', name: 'Novedades' },
            { role: 'heading', name: 'Servicio de referencia' }
        ]);
        await f.validarTextos([
            {locator: '#opacheader', text: 'BIBLIOTECAS'},
            {locator: '#opacheader', text: 'BCRA'},
            {locator: '#opaccredits', text: 'Email | biblio@bcra.gob.ar'},
            {locator: '#opaccredits', text: 'Sessions | Monday to Friday from 10 a.m. to 03 p.m.'},
            {locator: '#opaccredits', text: 'Biblioteca Dr. Raúl Prebisch | Reconquista 250 1° subsuelo'}, 
            {locator: '#opaccredits', text: 'Ciudad Autónoma de Buenos Aires - Argentina'},
            {locator: '#opaccredits', text: 'Biblioteca Tornquist | Reconquista 266 Hall San Martín'},
            {locator: '#opaccredits', text: 'Planta Baja - Local 4'},
            {locator: '#opaccredits', text: 'Ciudad Autónoma de Buenos Aires - Argentina'},
            {locator: '#koha_url', text: "Con tecnología  Koha / Theke Solutions"}
        ]);
    
    });

        // Verificar elementos Español
        await test.step('Verificar elementos Español', async () => {

            await f.clickButtons(['Languages']);
            await page.getByRole('menuitem', { name: 'Español' }).click();
            await f.elementosVisiblesR([
                { role: 'link', name: 'Catálogo en línea' },
                { role: 'link', name: 'Iniciar sesión' },
                { role: 'link', name: 'Historial de búsqueda' },
                { role: 'link', name: 'Limpiar' },
                { role: 'button', name: 'Listas' },
                { role: 'heading', name: 'Novedades' },
                { role: 'heading', name: 'Servicio de referencia' }
        ]);
            await f.validarTextos([
                {locator: '#opacheader', text: 'BIBLIOTECAS'},
                {locator: '#opacheader', text: 'BCRA'},
                {locator: '#opaccredits', text: 'Correo electrónico | biblio@bcra.gob.ar'},
                {locator: '#opaccredits', text: 'Turnos | de lunes a viernes de 10 a 15 hs.'},
                {locator: '#opaccredits', text: 'Biblioteca Dr. Raúl Prebisch | Reconquista 250 1° subsuelo'}, 
                {locator: '#opaccredits', text: 'Ciudad Autónoma de Buenos Aires - Argentina'},
                {locator: '#opaccredits', text: 'Biblioteca Tornquist | Reconquista 266 Hall San Martín'},
                {locator: '#opaccredits', text: 'Planta Baja - Local 4'},
                {locator: '#opaccredits', text: 'Ciudad Autónoma de Buenos Aires - Argentina'},
                {locator: '#koha_url', text: "Con tecnología  Koha / Theke Solutions"}
        ]);

    });

    // Verificar listas
    await test.step('Verificar listas', async () => {
        
        await f.clickButtons(['Listas']);
        await f.elementosVisiblesR([
            { role: 'menuitem', name: 'Listas públicas' },
            { role: 'menuitem', name: 'Donación Baiocco' },
            { role: 'menuitem', name: 'Premio Anual de Investigación' },
            { role: 'menuitem', name: 'Donacion CEDINCI' },
            { role: 'menuitem', name: 'José María Rosa' },
            { role: 'menuitem', name: 'Trabajo femenino' },
            { role: 'menuitem', name: 'Inmigración italiana' },
            { role: 'menuitem', name: 'Ver todo' },
            { role: 'menuitem', name: 'Sus listas' },
            { role: 'menuitem', name: 'Ingrese para crear sus' }
        ]);
        await f.clickButtons(['Listas']);

    });

    // Búsqueda
    await test.step('Búsqueda', async () => {

        await f.buscarPorTexto(buscar[0]);
        await f.elementosVisiblesR([
            { role: 'link', name: 'Resultados de búsqueda para \'' },
            { role: 'link', name: 'Refinar su búsqueda' },
            { role: 'heading', name: 'Disponibilidad' },
            { role: 'heading', name: 'Tipos de ítem' },
            { role: 'heading', name: 'Ubicaciones' },
            { role: 'heading', name: 'Lugares' },
            { role: 'heading', name: 'Series' },
            { role: 'heading', name: 'Temas' },
            { role: 'heading', name: 'Bibliotecas depositarias' },
            { role: 'heading', name: 'Bibliotecas de origen' },
            { role: 'heading', name: 'Idiomas' },
            { role: 'link', name: 'Resaltar' },
            { role: 'link', name: 'De-resaltar' },
            { role: 'link', name: 'Seleccionar todo' },
            { role: 'link', name: 'Limpiar todo' }
        ]);
        await f.getByLabel([
            { label: 'Suscribirse a esta búsqueda' },
            { label: 'Ordenar por' },
            { label: 'RSS para esta búsqueda' },
            { label: 'Recibir por correo electrónico' }
        ]);
        await f.getByText([
            { text: 'Seleccionar títulos para:' },
            { text: 'Agregar a la lista Listas pú' },
            { text: 'Seleccionar títulos para: Agregar al carrito Agregar a la lista Listas públicas' }
        ]);
        await f.validarTextos([
            { locator: '#numresults', text: 'Su búsqueda retornó' },
            { locator: '#title_summary_59069', text: buscar[0] }
        ]);
        await f.seleccionDropdownL([{ locator: '#masthead_search', option: 'ti'}]);
        await f.buscarPorTexto(buscar[1]);
        await f.validarTextos([
            { locator: '#numresults', text: 'Su búsqueda retornó' },
            { locator: '#title_summary_572660', text: buscar[1] }
        ]);
        await f.seleccionDropdownL([{ locator: '#masthead_search', option: 'au'}]);
        await f.buscarPorTexto(buscar[2]);
        await f.validarTextos([
            { locator: '#numresults', text: 'Su búsqueda retornó' },
            { locator: '#title_summary_55482', text: buscar[2] }
        ]);
        await f.seleccionDropdownL([{ locator: '#masthead_search', option: 'nb'}]);
        await f.buscarPorTexto(buscar[4]);
        await f.validarTextos([
            { locator: '#numresults', text: 'No se encontraron resultados!' },
        ]);

    });

});