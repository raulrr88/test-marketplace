export default interface ICreatePurchaseDTO {
  id: string;
  productId: string;
  marketplaceFee: number;
  storeFee: number;
  paymentPlatformFee: number;
}
