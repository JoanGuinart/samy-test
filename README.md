# Mi Aplicación de Imágenes

Esta aplicación es una interfaz en React que muestra una cuadrícula de imágenes, permite interactuar con ellas a través de un botón de "like" y cuenta con un header para navegación o branding. Utiliza GraphQL para obtener y actualizar datos de las imágenes.

## Características

- **PhotoGrid**: Muestra una cuadrícula de imágenes obtenidas vía GraphQL.
- **LikesButton**: Permite dar "like" a una imagen, actualizando el contador de likes de forma inmediata (optimistic UI).
- **Header**: Componente para la cabecera de la aplicación.
- **Tests Unitarios**: Se utilizan pruebas unitarias con Testing Library, Vitest y Apollo Client MockedProvider para garantizar el correcto funcionamiento de cada componente.

## Tecnologías Utilizadas

- **React**: Biblioteca para construir la interfaz de usuario.
- **Apollo Client**: Gestión de peticiones GraphQL.
- **Testing Library**: Herramienta para testear componentes de React.
- **Vitest**: Framework para ejecutar pruebas unitarias.
- **GraphQL**: Para la consulta y mutación de datos.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- npm

## Instalación

1. **Clonar el repositorio:**

  ```bash
    git clone <URL_DEL_REPOSITORIO>

2. **Entrar en la carpeta del proyecto:**

```bash
  cd <NOMBRE_DEL_PROYECTO>

3. **npm run dev**

4. **Test:**

 npm run test

