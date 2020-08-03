// Sample data
const orderItems = {
  item1: {
    id: "123456789",
    user: {
      _id: "5f23e7cc76b81f09349f01f4"
    },
    cart: [
      { _id: "5f2778d60fc19a396848d464", qty: 1 },
      { _id: "5f2778d60fc19a396848d465", qty: 1 }
    ],
    email: "test@test.com",
    shippingName: "shipping name test",
    shippingAddressCountry: "shipping address country test",
    shippingAddressCountryCode: "shipping address country code test",
    shippingAddressZip: "shipping address zip test",
    shippingAddressLine1: "shipping address address 1 test",
    shippingAddressLine2: "shipping address address 2 test",
    shippingAddressCity: "shipping address city test",
    shippingAddressState: "shipping address state test",
    paymentId: "payment Id test",
    orderDate: "08/20/2002",
    status: "In progress"
  },
  item2: {
    id: "987654321",
    user: {
      _id: "5f23e7cc76b81f09349f01f4"
    },
    cart: [
      { _id: "5f2778d60fc19a396848d464", qty: 2 },
      { _id: "5f2778d60fc19a396848d466", qty: 2 }
    ],
    email: "test@test.com",
    shippingName: "Johnny Makeup",
    shippingAddressCountry: "USA",
    shippingAddressCountryCode: "US",
    shippingAddressZip: "94556",
    shippingAddressLine1: "1072 Country Club Drive",
    shippingAddressLine2: "",
    shippingAddressCity: "Moraga",
    shippingAddressState: "CA",
    paymentId: "123456",
    orderDate: "08/22/2020",
    status: "In progress"
  },
};

export default orderItems;
