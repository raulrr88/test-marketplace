export default interface ICreatePurchaseDTO {
  id: string;
  productId: string;
  storeId: string;
  marketplaceFee: number;
  storeFee: number;
  paymentPlatformFee: number;
}
