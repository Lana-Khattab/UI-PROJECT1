const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Wooden Spoon',
    category: 'Utensils',
    price: 12.99,
    description: 'Natural bamboo spoon, perfect for cooking and serving',
    image: 'https://m.media-amazon.com/images/I/61W5ot-61GL._AC_SL1500_.jpg'
  },
  {
    name: 'Wooden Spatula',
    category: 'Utensils',
    price: 14.50,
    description: 'Durable wooden spatula for flipping and stirring',
    image: 'https://mcprod.hyperone.com.eg/media/catalog/product/cache/8d4e6327d79fd11192282459179cc69e/5/1/5132_8yzjrdfdf515151fdvl._ac_sl1184_-removebg-preview.png'
  },
  {
    name: 'Bamboo Tongs',
    category: 'Utensils',
    price: 16.99,
    description: 'Eco-friendly bamboo tongs with secure grip',
    image: 'https://www.refillroom.com/wp-content/uploads/2020/10/0871853007443.jpg'
  },
  {
    name: 'Silicone Spatula',
    category: 'Utensils',
    price: 18.75,
    description: 'Heat-resistant silicone spatula, dishwasher safe',
    image: 'https://zealzeal.com/cdn/shop/products/zeal-j222_large-spatula-in-aqua_2000x2000.jpg?v=1687527215'
  },
  {
    name: 'Silicone Spoon',
    category: 'Utensils',
    price: 15.99,
    description: 'Non-stick silicone cooking spoon',
    image: 'https://www.oxouk.com/wp-content/uploads/gg_11281400_2.jpg'
  },
  {
    name: 'Stainless Steel Whisk',
    category: 'Utensils',
    price: 22.99,
    description: 'Professional-grade stainless steel whisk',
    image: 'https://www.paderno.com/cdn/shop/products/Untitled_design_9_1b8b9237-b12c-435c-a148-42be00fcf329.png?v=1689605502'
  },
  {
    name: 'Stainless Steel Ladle',
    category: 'Utensils',
    price: 24.50,
    description: 'Heavy-duty stainless steel ladle for soups and stews',
    image: 'https://www.stellinox.com/5011-superlarge_default/stainless-steel-ladle.jpg'
  },
  {
    name: 'Stainless Steel Slotted Spoon',
    category: 'Utensils',
    price: 19.99,
    description: 'Slotted spoon for draining and serving',
    image: 'https://images.allianceonline.co.uk/Products/LSSB00291.jpg'
  },
  {
    name: 'Heat-Resistant Nylon Turner',
    category: 'Utensils',
    price: 17.50,
    description: 'Flexible nylon turner, safe for non-stick pans',
    image: 'https://cdnimg.webstaurantstore.com/images/products/large/748879/2843973.jpg'
  },
  {
    name: 'Heat-Resistant Nylon Tongs',
    category: 'Utensils',
    price: 20.99,
    description: 'Durable nylon tongs with locking mechanism',
    image: 'https://i5.walmartimages.com/seo/Norpro-Grip-EZ-9-Stainless-Steel-Nylon-Heat-Resistant-Locking-Spatula-Tongs-3-Pack_5e9e8989-beef-4cd0-94b1-889d37c49dd5.c0b7fcad85f69c2c47b32c08d2654429.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'
  },
  {
    name: 'Stainless Steel Measuring Cups',
    category: 'Measuring Tools',
    price: 28.99,
    description: 'Set of 4 stainless steel measuring cups',
    image: 'https://assets.wsimgs.com/wsimgs/rk/images/dp/wcm/202531/0042/img448o.jpg'
  },
  {
    name: 'Stainless Steel Measuring Spoons',
    category: 'Measuring Tools',
    price: 16.50,
    description: 'Set of 6 measuring spoons with ring holder',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ytBd4Lbk4lw496KUdhYfWzPh74wGpe_gGg&s'
  },
  {
    name: 'Stainless Steel Mixing Bowls',
    category: 'Mixing & Prep',
    price: 34.99,
    description: 'Set of 3 nested stainless steel bowls',
    image: 'https://m.media-amazon.com/images/I/51tDTO312kL._AC_SL1409_.jpg'
  },
  {
    name: 'Glass Measuring Jug',
    category: 'Measuring Tools',
    price: 25.99,
    description: 'Large capacity glass measuring jug with spout',
    image: 'https://www.ikea.com/au/en/images/products/vardagen-measuring-jug-glass__1094875_pe863653_s5.jpg'
  },
  {
    name: "Chef's Knife",
    category: 'Knives',
    price: 89.99,
    description: '8-inch professional chef knife with ergonomic handle',
    image: 'https://rebexcutlery.com/cdn/shop/products/1.jpg?v=1678293343&width=1946'
  },
  {
    name: 'Paring Knife',
    category: 'Knives',
    price: 35.50,
    description: 'Precision paring knife for detailed cutting',
    image: 'https://www.zwilling.com/dw/image/v2/BCGV_PRD/on/demandware.static/-/Sites-zwilling-master-catalog/default/dwd098f042/images/large/38400-080-0_1.jpg?sw=720&sh=720&sm=fit'
  },
  {
    name: 'Cutting Board',
    category: 'Cutting Boards',
    price: 42.00,
    description: 'Large bamboo cutting board with juice groove',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCyCQN7xAahKICdYEnMc0EFDrOEUZzWU7VmA&s'
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);

    console.log(`✅ Successfully inserted ${products.length} products into the database`);
    console.log('✅ Product seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
