import sheetWaste from './sheets/waste.json';
import type { WasteDef } from '../types/game';

const wasteImages = import.meta.glob('../assets/images/waste/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

// key は parts と washTargetKey から参照されるため、変更時は参照先も更新する。
// シートの img 列は images/waste/ 以下の既存アセットを指定する。
export const Waste: WasteDef[] = (sheetWaste as unknown as Array<Omit<WasteDef, 'img'> & { img: string }>).map((item) => {
  const assetUrl = wasteImages[`../assets/${item.img}`];
  if (!assetUrl) {
    throw new Error(`Waste image asset was not found: ${item.img}`);
  }
  return { ...item, img: assetUrl };
});
