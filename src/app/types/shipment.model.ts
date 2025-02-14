export interface Shipment {
  id: string;
  shipmentNumber: string;
  originId: string;
  destinationId?: string;
  type: ShipmentType;
  status: ShipmentStatus;
  weight: ShipmentWeight;
}

export type ShipmentType = `${ShipmentTypes}`;
export type ShipmentStatus = `${ShipmentStatuses}`;
export type ShipmentWeight = `${ShipmentWeights}`;

export enum ShipmentTypes {
  letter =  'LETTER',
  package = 'PACKAGE',
}

export enum ShipmentStatuses {
  originProcessed =  'ORIGIN_PROCESSED',
  destinationProcessed = 'DESTINATION_PROCESSED',
  delivered = 'DELIVERED',
}

export enum ShipmentWeights {
  lessThan1 =  'LESS_THAN_1KG',
  between1And5 = 'BETWEEN_1KG_5KG',
  moreThan5 = 'MORE_THAN_5KG',
}

export const ShipmentTypeLabels: Record<ShipmentType, string> = {
  LETTER: 'Letter',
  PACKAGE: 'Package',
};

export const ShipmentStatusLabels: Record<ShipmentStatus, string> = {
  ORIGIN_PROCESSED: 'Processed in Origin',
  DESTINATION_PROCESSED: 'Processed in Destination',
  DELIVERED: 'Delivered'
};

export const ShipmentWeightLabels: Record<ShipmentWeight, string> = {
  LESS_THAN_1KG: 'Under 1kg',
  BETWEEN_1KG_5KG: '1kg < 5kg',
  MORE_THAN_5KG: 'Beyond 5kg'
};
