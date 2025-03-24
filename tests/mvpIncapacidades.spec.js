import { test } from '@playwright/test';
import { Funciones } from '../funciones/Funciones';

// Variables - Datos de prueba

const url = 'https://desa-incapacidades.artprovincia.ar/';
const email = 'prueba@provart.com.ar';
const password = 'Contraseña!2022';
const buscar = ['CHILOTE', '20326906043', '02225215'];
const filtros = ['En curso', 'Validado', 'BUENOS AIRES ', 'BERISSO', "01012023", "31122023"];
const noEsperables = ['Asignado', 'No validado'];

// Test
test('MVP Incapacidades Test', async ({ page }) => {

    const f = new Funciones(page);

    // Login
    await test.step('Login', async () => {

        await f.dirigirseA(url);
        await f.elementosVisibles([
            { role: 'img', name: 'logo-provincia-art' },
            { role: 'heading', name: 'Iniciá sesión' },
            { role: 'heading', name: 'Correo electrónico' },
            { role: 'heading', name: 'Contraseña' },
            { role: 'button', name: 'Iniciar sesión' }
        ]);
        await f.loguearse([
            { placeholder: 'Ingresá tu correo electrónico', text: email },
            { placeholder: 'Ingresá tu contraseña', text: password }],
            ['Iniciar sesión' ]);
        await f.elementosVisibles([
            { role: 'button', name: 'Citación a Junta Médica' },
            { role: 'heading', name: 'Gestión de Incapacidades' }
        ]);
        
    });

    // Verificar tabs
    await test.step('Verificar tabs', async () => {

        await f.clickButtons(['Pendientes']);
        await f.validarTextos([{locator: 'tbody', text: 'Asignado'}]);
        await f.clickButtons(['Activos']);
        await f.validarTextos([{locator: 'tbody', text: 'En curso'}]);

    });

    // Búsqueda
    await test.step('Búsqueda por texto', async () => {

        await f.llenarCampos([{ placeholder: 'Buscar por Nombre / CUIL / N', text: buscar[0]}]);
        await f.resultados([{ locator: 'tbody', text: buscar[0], borrar: 'close' }]);  
        await f.llenarCampos([{ placeholder: 'Buscar por Nombre / CUIL / N', text: buscar[1]}]);
        await f.llenarCampos([{ placeholder: 'Buscar por Nombre / CUIL / N', text: buscar[2]}]);
        await f.resultados([{ locator: 'tbody', text: buscar[2], borrar: 'close' }]);
        
    });

    // Aplicar filtros
    await test.step('Aplicar filtros', async () => {

        await f.clickButtons(['filter_list Filtrar']);
        await f.seleccionDropdown([
            { placeholder: 'Ej. Asignado', option: filtros[0]},
            { placeholder: 'Ej. Validado', option: filtros[1]},
            { placeholder: 'Ej. Buenos Aires', option: filtros[2]},
            { placeholder: 'Ej. Palermo', option: filtros[3]},
        ]);
        await f.llenarCampos([
            { placeholder: '/01/2024', text: filtros[4]},
            { placeholder: '/01/2025', text: filtros[5]}
        ]);
        await f.clickButtons(['Ver resultados']);

        // Validar resultados
        await f.validarTextos([
            {locator: 'tbody', text: filtros[0]},
            {locator: 'tbody', text: filtros[1]},
            {locator: 'tbody', text: filtros[2]},
            {locator: 'tbody', text: filtros[3]}
        ]);
        await f.textosNoEsperados([
            {locator: 'tbody', text: noEsperables[0]},
            {locator: 'tbody', text: noEsperables[1]}
        ]);

    });

    // Ver ficha
    await test.step('Ver ficha', async () => {

        await f.verFicha(1);
        await f.elementosVisibles([
            { role: 'heading', name: 'Datos de la persona trabajadora' },
            { role: 'button', name: 'Citar a Junta Médica' },
            { role: 'button', name: 'arrow_back_ios Volver' },
            { role: 'button', name: 'content_paste Historia clínica' },
            { role: 'button', name: 'calendar_month Citación' }
        ]);
        await f.getByText([
            { text: 'person' },
            { text: 'CUIL' },
            { text: 'Fecha de nacimiento' },
            { text: 'Edad al momento del accidente' },
            { text: 'Domicilio' },
            { text: 'Teléfono' },
            { text: 'Correo electrónico' },
            { text: 'work_outline' },
            { text: 'Aseguradora' },
            { text: 'Fecha de alta médica' },
            { text: 'Tipo de accidente' },
            { text: 'Número de siniestro' },
            { text: 'Fecha de accidente' },
            { text: 'Mecanismo accidentológico' },
            { text: filtros[3] }
        ]);
        await f.clickButtons(['content_paste Historia clínica']);
        await f.getByText([
            { text: 'Diagnóstico' },
            { text: 'Con cirugía' },
            { text: 'Parte del cuerpo afectada' },
            { text: 'Con placas' }
        ]);
        await f.clickButtons(['arrow_back_ios Volver']);
        await f.elementosVisibles([
            { role: 'heading', name: 'Gestión de Incapacidades' },
        ]);

    });

    // Aceptar / Rechazar
    await test.step('Aceptar / Rechazar', async () => {
        
        await f.clickButtons(['Pendientes']);
        await f.checkearCaso(1);
        await f.clickButtons(['close Rechazar']);
        await f.elementosVisibles([
            { role: 'button', name: 'close' },
            { role: 'button', name: 'Cancelar' },
            { role: 'button', name: 'Rechazar caso' }
        ]);
        await f.validarTextos([
            { locator: '#modal-background', text: 'info¿Deseas rechazar el caso seleccionado?' },
            { locator: '#modal-background', text: 'Una vez rechazado, el caso será devuelto y no estará disponible en tu gestión. Asegúrate de estar de acuerdo antes de continuar.' }
        ]);
        await f.clickButtons(['Cancelar']);
        
        await f.clickButtons(['check Aceptar']);
        await f.elementosVisibles([
            { role: 'button', name: 'close' },
            { role: 'button', name: 'Cancelar' },
            { role: 'button', name: 'Aceptar caso' }
        ]);
        await f.validarTextos([
            { locator: '#modal-background', text: 'info¿Deseas aceptar el caso seleccionado?' },
            { locator: '#modal-background', text: 'Una vez aceptado, el caso pasará a tu gestión en “Activos”. Asegúrate de estar de acuerdo antes de continuar.' }
        ]);
        await f.clickButtons(['Cancelar']);

        await f.checkearCaso(2);
        await f.clickButtons(['close Rechazar']);
        await f.elementosVisibles([
            { role: 'button', name: 'close' },
            { role: 'button', name: 'Cancelar' },
            { role: 'button', name: 'Rechazar casos' }
        ]);
        await f.validarTextos([
            { locator: '#modal-background', text: 'info¿Deseas rechazar los casos seleccionados?' },
            { locator: '#modal-background', text: 'Una vez rechazados, los casos serán devueltos y no estarán disponibles en tu gestión. Asegúrate de estar de acuerdo antes de continuar.' }
        ]);
        await f.clickButtons(['Cancelar']);

        await f.clickButtons(['check Aceptar']);
        await f.elementosVisibles([
            { role: 'button', name: 'close' },
            { role: 'button', name: 'Cancelar' },
            { role: 'button', name: 'Aceptar casos' }
        ]);
        await f.validarTextos([
            { locator: '#modal-background', text: 'info¿Deseas aceptar los casos seleccionados?' },
            { locator: '#modal-background', text: 'Una vez aceptados, los casos pasarán a tu gestión en “Activos”. Asegúrate de estar de acuerdo antes de continuar.' }
        ]);
        await f.clickButtons(['Cancelar']);

    });

    // Verificar menu de usuario
    await test.step('Verificar menú de usuario', async () => {
            
        await f.elementosVisiblesB([
            { role: 'button', name: 'notifications' },
            { role: 'button', name: 'account_circle Mi perfil' }
        ]);
        await f.clickButtonsB(['account_circle Mi perfil']);
        await f.elementosVisiblesB([
            { role: 'button', name: 'person Mas información'},
            { role: 'button', name: 'settings Configuración'},
            { role: 'button', name: 'power_settings_new Cerrar'}
        ]);

    });
    
    // Cerrar sesión    
    await test.step('Cerrar sesión', async () => { 

        await f.clickButtonsB(['power_settings_new Cerrar']);
        await f.elementosVisibles([
            { role: 'heading', name: 'Iniciá sesión' }
        ]);

    });

});