export default interface Adress {
  id: string;
  orderId: string;
  recipientName: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  district: string | undefined;
  street: string;
  houseNumber: string | undefined;
  postalCode: string | undefined;
  lat: number;
  lng: number;
  reference: string | undefined;
  instructions: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}
