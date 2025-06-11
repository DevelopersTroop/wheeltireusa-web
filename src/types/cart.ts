import { TInventoryItem, TInventoryListItem } from './product';

export type TCartProduct = TInventoryItem &
  TInventoryListItem & {
    singleQuantityPrice?: number;
    totalPrice?: number;
    quantity: number;
    slug: string;
    sku?: string;
    title?: string;
    image?: string;
    maxInventory: number;
    minInventory: number;
    inventoryStep: number;
    vehicleInformation: string;
    forging_style?: string;
    cartPackage: string;
    cartSerial: string;
    isFrontTire?: boolean;
    isRearTire?: boolean;
    tirePackageUrl?: string;
    metaData?: {
      frontForging?: string;
      rearForging?: string;
      frontDiameter?: string;
      rearDiameter?: string;
      frontWidth?: string;
      rearWidth?: string;
      frontLipSize?: string;
      rearLipSize?: string;
      finishType?: string;
      standardFinish?: string;
      horn?: string;
      customFinish?: string;
      centerCapTitle?: string;
      wantWidestPossibleWidth?: boolean;
      multiPiece?: string;
      letAmaniForgedDetermineSize?: boolean;
      lugBoltFinish?: string;
      selectedHorn?: string;
      year?: string;
      make?: string;
      model?: string;
      bodyType?: string;
      subModel?: string;
      coupon?: string;
      totalProvidedDiscount?: number;
    };
  } & Partial<TInventoryItem>;
