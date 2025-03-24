(Estos son pasos una vez tengamos el proyecto, después de hacer el git clone)
1. Abrir la terminal en VisualStudio ctrl + ñ (Selecionar git bash en el terminal)
2. escribir: npm i y darle al enter (traerse las librerias y paquetes necesarios para que funcionen las pruebas)
3. esto por defecto nos trae la rama de selenium y sus pruebas, puede modificar todo lo que esta en inicio.spec.js (con npm run test se van a correr las pruebas de selenium)
4. Selecionar el boton del lado izquierdo abajo, donde dice "e2e/test", escoger el que dice "e2e/playwrigth"
5. escribir: npm i y luego npx playwright install
6. Una vez instalado todo podemos usar npx playwright codegen (el que abrirá el navegador)
7. con npx playwright test se corren los comandos y para correr 1 solo "archivo/test podemos poner": npx playwright test nombre_del_archivo
8. Selcionamos de nuevo el boton del lado izquierdo abajo y selecionamos "crear nueva rama apartir de", le ponemos el nombre que erramos ejemplo e2e/crosas
9. Luego selcionamos de nuevo el boton del lado izquierdo abajo pero esta vez en la "nube" ![alt text](image.png)
10. Para subir los cambios que tenemos selecionamos el icono de control de código que es el siguiente: ![alt text](image-1.png)
11. Escribimos un mensaje de que es lo que estamos subiendo
12. le damos confirmar -> si 
13. Luego nos dirá "sincronizar cabmios"
14. Le damos sincronizar