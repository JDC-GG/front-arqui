## Usage

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with the [documentations](https://vite.dev/guide/static-deploy.html)

## Docker
docker run -it --rm -v "${PWD}:/app" -w /app -p 5173:5173 node:20-alpine sh
npm run dev -- --host 0.0.0.0

## si sale problemas en el index (f12 en la pagina) seguir estos pasos
 # 1. Elimina la carpeta de dependencias (¡Esto la borra también de tu PC local!)
rm -rf node_modules

# 2. Elimina el archivo de bloqueo
rm package-lock.json 

# 3. Elimina la caché de Vite (si existe)
rm -rf node_modules/.vite

npm install

npm run dev -- --host 0.0.0.0