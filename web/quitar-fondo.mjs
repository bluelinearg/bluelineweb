// Corre con: node quitar-fondo.mjs
// Requiere: npm install jimp  (en la carpeta web/)
// Quita el fondo blanco de las casacas Firstar y guarda como PNG transparente

import Jimp from 'jimp';
import path from 'path';

const imagenes = [
  'img/casaca-firstar-negro.png',
  'img/casaca-firstar-rojo.png',
];

async function quitarFondoBlanco(archivo) {
  const img = await Jimp.read(archivo);
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    // Pixels casi blancos → transparente
    if (r > 230 && g > 230 && b > 230) {
      this.bitmap.data[idx + 3] = 0;
    }
  });
  await img.writeAsync(archivo);
  console.log('✓ Procesado:', archivo);
}

for (const archivo of imagenes) {
  await quitarFondoBlanco(archivo);
}
console.log('Listo.');
