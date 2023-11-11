// import {
//   PrismaClient,
//   type_kardex,
//   type_movement,
//   type movements,
// } from "@prisma/client";
// const prisma = new PrismaClient();
// async function createVariant() {}
// class CreateProductDTO {
//   name: string;
//   brand: string;
//   kardex_type: type_kardex;
//   constructor({
//     name,
//     brand,
//     kardex_type,
//   }: {
//     name: string;
//     brand: string;
//     kardex_type: type_kardex;
//   }) {
//     this.name = name;
//     this.brand = brand;
//     this.kardex_type = kardex_type;
//   }
// }
// async function createProduct(createProductDTO: CreateProductDTO) {
//   const { name, brand, kardex_type } = createProductDTO;
//   const new_product = await prisma.products.create({
//     data: {
//       name,
//       brand,
//       kardex: {
//         create: {
//           kardex_type,
//         },
//       },
//     },
//     include: {
//       kardex: true,
//     },
//   });
//   return new_product;
// }
// class CreatesMovementsDTO {
//   kardex_id: string;
//   movements: movements[];
//   constructor({
//     movements,
//     kardex_id,
//   }: {
//     movements: movements[];
//     kardex_id: string;
//   }) {
//     this.kardex_id = kardex_id;
//     this.movements = movements;
//   }
// }
// async function createMovement(createsMovementsDTO: CreatesMovementsDTO) {
//   const { kardex_id } = createsMovementsDTO;
//   const movements = await prisma.movements.createMany({
//     data: [
//       {
//         description: "",
//         kardex_id: "",
//         type_movement: "IN",
//       },
//     ],
//   });
//   let calculate_stock = 0;
//   let calculate_total_price = 0;
//   let calculate_price = 0;
//   valor total - cantidad stock
//   const updateKardex = await prisma.kardexs.update({
//     data: {
//       stock: calculate_stock,
//       total_price: calculate_total_price,
//       price: calculate_price,
//     },
//     where: {
//       id: kardex_id,
//     },
//   });
// }
