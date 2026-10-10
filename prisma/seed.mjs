import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Eternal 6 database...');

  // Clear existing items
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.handArtService.deleteMany({});
  await prisma.handArtBooking.deleteMany({});
  await prisma.customerReview.deleteMany({});
  await prisma.siteSetting.deleteMany({});

  // Seed Products
  const products = [
    {
      sku: 'ET6-HJ-YEL-01',
      name: 'Sunshine Yellow Bedazzling Stone Work Hijab',
      slug: 'sunshine-yellow-bedazzling-stone-work-hijab',
      description: 'Handcrafted luxury hijab featuring radiant bedazzling floral crystal stone work on premium textured Muna Jori fabric. Lightweight, breathable, and designed for grand festive occasions and wedding celebrations.',
      category: 'Hijabs',
      collection: 'Bridal Collection',
      price: 1600,
      salePrice: 800,
      material: 'Muna Jori',
      careInstructions: 'Dry clean or gentle hand wash in cold water with mild detergent. Do not wring or bleach. Steam iron on reverse.',
      colors: JSON.stringify(['#F5D061', '#E6C65A']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Sunshine Yellow', stock: 18 }
      ]),
      stock: 18,
      images: JSON.stringify([
        '/images/eternal6/crops/sunshine-yellow-muna-jori.jpg',
        '/images/eternal6/790476251_122113054899417938_5662713628547669874_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: true,
    },
    {
      sku: 'ET6-HJ-RED-02',
      name: 'Crimson Red Bedazzling Stone Work Hijab',
      slug: 'crimson-red-bedazzling-stone-work-hijab',
      description: 'Striking crimson red premium georgette hijab adorned with an exquisite side forehead crystal stone cascade and glittering drape accents. Soft, flowing, and graceful.',
      category: 'Hijabs',
      collection: 'Premium Chiffon',
      price: 1000,
      salePrice: 500,
      material: 'Georgette',
      careInstructions: 'Hand wash gently. Hang dry in shade. Light steam iron.',
      colors: JSON.stringify(['#C2182B', '#8E101E']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Crimson Red', stock: 24 }
      ]),
      stock: 24,
      images: JSON.stringify([
        '/images/eternal6/crops/crimson-red-georgette.jpg',
        '/images/eternal6/791648527_122113022721417938_8712576263468059069_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-ROSE-03',
      name: 'Rose Pink Scallop Stone Work Hijab',
      slug: 'rose-pink-scallop-stone-work-hijab',
      description: 'Grace in every detail. Features a scalloped crystal chain border along the hemline with delicate scattered stone highlights across flowing soft georgette.',
      category: 'Hijabs',
      collection: 'Everyday Elegance',
      price: 1200,
      salePrice: 600,
      material: 'Georgette',
      careInstructions: 'Cold water wash only. Air dry flat.',
      colors: JSON.stringify(['#E6739F', '#F498BD']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Rose Pink', stock: 15 }
      ]),
      stock: 15,
      images: JSON.stringify([
        '/images/eternal6/crops/rose-pink-georgette.jpg',
        '/images/eternal6/792520625_122114154645417938_2262845900248809432_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-CORAL-04',
      name: 'Coral Rose Block Print Zafran Hijab',
      slug: 'coral-rose-block-print-zafran-hijab',
      description: 'Crafted from ultra-soft, breathable premium Zafran fabric with delicate white botanical block prints and the hallmark Eternal 6 gold signature metallic tag.',
      category: 'Hijabs',
      collection: 'Everyday Elegance',
      price: 499,
      salePrice: null,
      material: 'Zafran',
      careInstructions: 'Machine wash delicate cycle in cold water. Iron on low heat.',
      colors: JSON.stringify(['#F07C76', '#E9635C']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 32")', color: 'Coral Rose', stock: 30 }
      ]),
      stock: 30,
      images: JSON.stringify([
        '/images/eternal6/crops/coral-rose-zafran-blockprint.jpg',
        '/images/eternal6/792863888_122113284351417938_1144984186792382822_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-BLUSH-05',
      name: 'Stitched Stone Work Blush Pink Hijab',
      slug: 'stitched-stone-work-blush-pink-hijab',
      description: 'Elegance in every drape. Features micro-embroidered floral stems topped with sparkling crystal stones across blush pink georgette.',
      category: 'Hijabs',
      collection: 'Premium Chiffon',
      price: 1600,
      salePrice: 800,
      material: 'Georgette',
      careInstructions: 'Hand wash gently. Hang to dry.',
      colors: JSON.stringify(['#F4A7BB', '#E892A8']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Blush Pink', stock: 12 }
      ]),
      stock: 12,
      images: JSON.stringify([
        '/images/eternal6/crops/blush-pink-georgette.jpg',
        '/images/eternal6/793203750_122113570419417938_1030271338946832518_n.jpg'
      ]),
      isPublished: true,
      isFeatured: false,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-EMR-06',
      name: 'Emerald Forest Hand Embroidery Zafran Hijab',
      slug: 'emerald-forest-hand-embroidery-zafran-hijab',
      description: 'Bespoke hand embroidery work showcasing ornate multi-colored floral medallions and seed pearls over luxurious dark emerald Zafran fabric.',
      category: 'Hijabs',
      collection: 'The Pearl Edit',
      price: 1500,
      salePrice: 1200,
      material: 'Zafran',
      careInstructions: 'Dry clean recommended. Protect embroidery when ironing.',
      colors: JSON.stringify(['#124330', '#1C5B42']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 32")', color: 'Emerald Forest', stock: 10 }
      ]),
      stock: 10,
      images: JSON.stringify([
        '/images/eternal6/crops/emerald-forest-zafran-embroidery.jpg',
        '/images/eternal6/793222671_122113759149417938_8927346515413895308_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: true,
    },
    {
      sku: 'ET6-HJ-RUBY-07',
      name: 'Ruby Red Karchupi Work Zafran Hijab',
      slug: 'ruby-red-karchupi-work-zafran-hijab',
      description: 'Traditional artisan Karchupi needlework with shimmering gold thread chains and crystalline flowerets. Timeless style, eternal grace.',
      category: 'Hijabs',
      collection: 'Bridal Collection',
      price: 1500,
      salePrice: null,
      material: 'Zafran',
      careInstructions: 'Dry clean only to maintain gold karchupi thread integrity.',
      colors: JSON.stringify(['#E61937', '#B80F27']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 32")', color: 'Ruby Red', stock: 8 }
      ]),
      stock: 8,
      images: JSON.stringify([
        '/images/eternal6/crops/ruby-red-zafran-karchupi.jpg',
        '/images/eternal6/796449869_122117423703417938_2404201161141518781_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-AMB-08',
      name: 'Amber Rust Zari & Stone Work Hijab',
      slug: 'amber-rust-zari-and-stone-work-hijab',
      description: 'Luminous amber rust georgette embellished with golden zari floral foliage, fabric applique, and sparkling centered stones. Breathable and regal.',
      category: 'Hijabs',
      collection: 'Everyday Elegance',
      price: 1600,
      salePrice: null,
      material: 'Georgette',
      careInstructions: 'Gentle hand wash. Iron on reverse.',
      colors: JSON.stringify(['#D45B1E', '#BA460E']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Amber Rust', stock: 14 }
      ]),
      stock: 14,
      images: JSON.stringify([
        '/images/eternal6/crops/amber-rust-georgette-zari.jpg',
        '/images/eternal6/796659449_122117703873417938_3954812306350071443_n.jpg'
      ]),
      isPublished: true,
      isFeatured: false,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-LOTUS-09',
      name: 'Forest Green Lotus Stone Work Hijab',
      slug: 'forest-green-lotus-stone-work-hijab',
      description: 'Deep forest green georgette sprinkled with delicate lotus-petal crystal clusters that shimmer with movement. Flowing, elegant drape.',
      category: 'Hijabs',
      collection: 'Premium Chiffon',
      price: 1600,
      salePrice: 800,
      material: 'Georgette',
      careInstructions: 'Hand wash in cold water with gentle detergent.',
      colors: JSON.stringify(['#1F402D', '#152C1E']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Forest Green', stock: 20 }
      ]),
      stock: 20,
      images: JSON.stringify([
        '/images/eternal6/crops/forest-green-lotus-stone.jpg',
        '/images/eternal6/797914095_122113955847417938_3436505967665324430_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-MOC-10',
      name: 'Mocha Brown Stitched Stone Hijab',
      slug: 'mocha-brown-stitched-stone-hijab',
      description: 'Sophisticated mocha brown georgette with vertical crystal stone streams that elongate the drape gracefully. Lightweight and versatile for daily styling.',
      category: 'Hijabs',
      collection: 'Everyday Elegance',
      price: 499,
      salePrice: null,
      material: 'Georgette',
      careInstructions: 'Machine washable on gentle cycle.',
      colors: JSON.stringify(['#583E31', '#724E3E']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Mocha Brown', stock: 25 }
      ]),
      stock: 25,
      images: JSON.stringify([
        '/images/eternal6/crops/mocha-brown-stitched-stone.jpg',
        '/images/eternal6/798018707_122115091809417938_1132919255195507075_n.jpg'
      ]),
      isPublished: true,
      isFeatured: false,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-CNDY-11',
      name: 'Candy Pink Side-Crown Stone Hijab',
      slug: 'candy-pink-side-crown-stone-hijab',
      description: 'Glamorous candy pink georgette crowned with an ornate curved tiara of crystals along the side temple. Creates an instant royal aesthetic without separate pins.',
      category: 'Hijabs',
      collection: 'Bridal Collection',
      price: 1000,
      salePrice: 500,
      material: 'Georgette',
      careInstructions: 'Hand wash gently around crown crystals.',
      colors: JSON.stringify(['#F57EA6', '#E95F8E']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Candy Pink', stock: 16 }
      ]),
      stock: 16,
      images: JSON.stringify([
        '/images/eternal6/crops/candy-pink-side-crown.jpg',
        '/images/eternal6/799487187_122114359719417938_7780993890436943716_n.jpg'
      ]),
      isPublished: true,
      isFeatured: false,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-OCN-12',
      name: 'Ocean Teal Four-Petal Stone Hijab',
      slug: 'ocean-teal-four-petal-stone-hijab',
      description: 'Rich ocean teal georgette patterned with all-over four-petal diamond crystals that catch the light from every perspective.',
      category: 'Hijabs',
      collection: 'Premium Chiffon',
      price: 599,
      salePrice: null,
      material: 'Georgette',
      careInstructions: 'Hand wash in cold water.',
      colors: JSON.stringify(['#0C6275', '#164E5E']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Ocean Teal', stock: 22 }
      ]),
      stock: 22,
      images: JSON.stringify([
        '/images/eternal6/crops/ocean-teal-four-petal.jpg',
        '/images/eternal6/800642886_122115296217417938_1161114696972497991_n.jpg'
      ]),
      isPublished: true,
      isFeatured: false,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-CRM-13',
      name: 'Cream Peach Kalka Block Paint Hijab',
      slug: 'cream-peach-kalka-block-paint-hijab',
      description: 'Artisanal Zafran fabric featuring handcrafted green and gold heritage paisley (kalka) motifs. Lightweight, elegant, and timeless.',
      category: 'Hijabs',
      collection: 'Everyday Elegance',
      price: 799,
      salePrice: null,
      material: 'Zafran',
      careInstructions: 'Hand wash cold. Do not scrub block print directly.',
      colors: JSON.stringify(['#FCE3D0', '#EED0B8']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 32")', color: 'Cream Peach', stock: 19 }
      ]),
      stock: 19,
      images: JSON.stringify([
        '/images/eternal6/crops/cream-peach-kalka-blockpaint.jpg',
        '/images/eternal6/801581573_122115695487417938_2230315553494698049_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-VLT-14',
      name: 'Royal Violet Bedazzling Stone Hijab',
      slug: 'royal-violet-bedazzling-stone-hijab',
      description: 'Sumptuous royal violet georgette woven with subtle metallic threads and highlighted with golden floret crystal studs throughout the fabric.',
      category: 'Hijabs',
      collection: 'Premium Chiffon',
      price: 800,
      salePrice: null,
      material: 'Georgette',
      careInstructions: 'Gentle hand wash. Hang to dry.',
      colors: JSON.stringify(['#4A1D85', '#330E66']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Royal Violet', stock: 17 }
      ]),
      stock: 17,
      images: JSON.stringify([
        '/images/eternal6/crops/royal-violet-stone-work.jpg',
        '/images/eternal6/802030968_122115751425417938_6203237547873765481_n.jpg'
      ]),
      isPublished: true,
      isFeatured: false,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-BLS-15',
      name: 'Blossom Pink Pearl & Embroidery Hijab',
      slug: 'blossom-pink-pearl-and-embroidery-hijab',
      description: 'Signature piece from The Pearl Edit. Crafted in delicate blossom pink Zafran with scalloped floral lace hem, fine embroidery, and real moti pearl studs.',
      category: 'Hijabs',
      collection: 'The Pearl Edit',
      price: 800,
      salePrice: null,
      material: 'Zafran',
      careInstructions: 'Delicate hand wash. Protect pearls during ironing.',
      colors: JSON.stringify(['#F4A1BA', '#E58AA6']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 32")', color: 'Blossom Pink', stock: 15 }
      ]),
      stock: 15,
      images: JSON.stringify([
        '/images/eternal6/crops/blossom-pink-pearl-embroidery.jpg',
        '/images/eternal6/807284079_122116137831417938_7682188132973942430_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: true,
    },
    {
      sku: 'ET6-HJ-DRK-16',
      name: 'Dark Emerald Pearl Scallop Hijab',
      slug: 'dark-emerald-pearl-scallop-hijab',
      description: 'Bespoke dark emerald Zafran hijab adorned with white scalloped floral embroidery and luminous moti pearls nestled inside each bloom. Signature boutique craftsmanship.',
      category: 'Hijabs',
      collection: 'The Pearl Edit',
      price: 1200,
      salePrice: null,
      material: 'Zafran',
      careInstructions: 'Dry clean or gentle hand wash. Protect central pearls.',
      colors: JSON.stringify(['#143C2E', '#0B291E']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 32")', color: 'Dark Emerald', stock: 11 }
      ]),
      stock: 11,
      images: JSON.stringify([
        '/images/eternal6/crops/dark-emerald-pearl-scallop.jpg',
        '/images/eternal6/813421044_122116441539417938_9146068749978506774_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: true,
    },
    {
      sku: 'ET6-HJ-SAP-17',
      name: 'Sapphire Floral Fabric Paint & Zari Hijab',
      slug: 'sapphire-floral-fabric-paint-and-zari-hijab',
      description: 'Artisan hand-painted sapphire blue floral bouquets outlined with intricate gold zari thread work. Fluid georgette drape that exudes timeless grace.',
      category: 'Hijabs',
      collection: 'Premium Chiffon',
      price: 800,
      salePrice: null,
      material: 'Georgette',
      careInstructions: 'Hand wash gently in cold water. Iron on reverse side only.',
      colors: JSON.stringify(['#1748A0', '#0D3175']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Sapphire Blue', stock: 14 }
      ]),
      stock: 14,
      images: JSON.stringify([
        '/images/eternal6/crops/sapphire-floral-fabric-paint.jpg',
        '/images/eternal6/814085394_122116793409417938_2982468074286500883_n.jpg'
      ]),
      isPublished: true,
      isFeatured: false,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-MNT-18',
      name: 'Mint Flora Block Print Zafran Hijab',
      slug: 'mint-flora-block-print-zafran-hijab',
      description: 'Cool pastel mint Zafran hijab with refreshing emerald rosette block print pattern. Soft, featherlight, and ideal for warm days and effortless modesty.',
      category: 'Hijabs',
      collection: 'Everyday Elegance',
      price: 499,
      salePrice: null,
      material: 'Zafran',
      careInstructions: 'Machine wash delicate cold.',
      colors: JSON.stringify(['#B8E4C9', '#96CBA8']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 32")', color: 'Pastel Mint', stock: 26 }
      ]),
      stock: 26,
      images: JSON.stringify([
        '/images/eternal6/crops/mint-flora-zafran-blockprint.jpg',
        '/images/eternal6/814779680_122116863021417938_8217452614570033107_n.jpg'
      ]),
      isPublished: true,
      isFeatured: false,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-IVR-19',
      name: 'Ivory Magenta Mirror Work Zafran Hijab',
      slug: 'ivory-magenta-mirror-work-zafran-hijab',
      description: 'Crisp ivory white Zafran fabric detailed with vibrant magenta floral cross-prints and authentic hand-set circular mirrors at each blossom heart.',
      category: 'Hijabs',
      collection: 'Everyday Elegance',
      price: 799,
      salePrice: null,
      material: 'Zafran',
      careInstructions: 'Delicate hand wash. Avoid heavy friction on mirrors.',
      colors: JSON.stringify(['#FAF7F2', '#D81B60']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 32")', color: 'Ivory Magenta', stock: 18 }
      ]),
      stock: 18,
      images: JSON.stringify([
        '/images/eternal6/crops/ivory-magenta-mirror-work.jpg',
        '/images/eternal6/818366376_122118452811417938_8350067677185814966_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-COC-20',
      name: 'Cocoa Bronze Star Mirror Hijab',
      slug: 'cocoa-bronze-star-mirror-hijab',
      description: 'Warm cocoa bronze georgette adorned with golden floral hand painting and center mirror work that shines like evening stars.',
      category: 'Hijabs',
      collection: 'Everyday Elegance',
      price: 600,
      salePrice: null,
      material: 'Georgette',
      careInstructions: 'Hand wash gently. Hang dry in shade.',
      colors: JSON.stringify(['#674232', '#4D2F22']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Cocoa Bronze', stock: 15 }
      ]),
      stock: 15,
      images: JSON.stringify([
        '/images/eternal6/crops/cocoa-bronze-star-mirror.jpg',
        '/images/eternal6/818384465_122117056557417938_8741573921319891954_n.jpg'
      ]),
      isPublished: true,
      isFeatured: false,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-TIA-21',
      name: 'Royal Teal Floral Tiara Stone Hijab',
      slug: 'royal-teal-floral-tiara-stone-hijab',
      description: 'Regal dark teal georgette with an integrated double floral crystal tiara band framing the face and extending down the drape seam.',
      category: 'Hijabs',
      collection: 'Bridal Collection',
      price: 600,
      salePrice: null,
      material: 'Georgette',
      careInstructions: 'Gentle hand wash. Iron on reverse.',
      colors: JSON.stringify(['#145A68', '#0C3D47']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Standard (75" x 30")', color: 'Royal Teal', stock: 19 }
      ]),
      stock: 19,
      images: JSON.stringify([
        '/images/eternal6/crops/royal-teal-floral-tiara.jpg',
        '/images/eternal6/825267296_122119093767417938_7114475076870301111_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: false,
    },
    {
      sku: 'ET6-HJ-CST-22',
      name: 'Bespoke Family Name-Embroidered Hijab',
      slug: 'bespoke-family-name-embroidered-hijab',
      description: 'Exclusive custom artisan service. Meticulously hand-embroidered with Bengali or Arabic calligraphy of family names, wedding tributes, or Quranic verses in tone-on-tone fine thread. 7-day creation turnaround.',
      category: 'Hijabs',
      collection: 'The Pearl Edit',
      price: 1800,
      salePrice: null,
      material: 'Premium Silk Georgette',
      careInstructions: 'Dry clean only. Heirloom keepsake piece.',
      colors: JSON.stringify(['#1F2430', '#342722']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Customized Order (75" x 32")', color: 'Midnight Noir', stock: 5 }
      ]),
      stock: 5,
      images: JSON.stringify([
        '/images/eternal6/839167560_122121242229417938_2917651611701043024_n.jpg',
        '/images/eternal6/842034237_122121242289417938_3343087035543472055_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: true,
    },
    {
      sku: 'ET6-SET-KBA-23',
      name: 'Kaaba Sacred Art Canvas & Embroidered Hijab Gift Set',
      slug: 'kaaba-sacred-art-canvas-and-hijab-set',
      description: 'A curated gift box containing a miniature original hand-painted Kaaba art canvas with Islamic calligraphy, paired with a bespoke embroidered keepsake hijab in signature Eternal 6 luxury presentation box with pearl accents.',
      category: 'Gift Sets',
      collection: 'Gift Sets',
      price: 2200,
      salePrice: null,
      material: 'Hand-stretched Canvas & Silk',
      careInstructions: 'Canvas: keep dry away from direct sunlight. Hijab: gentle care.',
      colors: JSON.stringify(['#1F2430', '#D6B878']),
      variants: JSON.stringify([
        { id: 'v1', name: 'Complete Luxury Box Set', color: 'Midnight & Gold', stock: 7 }
      ]),
      stock: 7,
      images: JSON.stringify([
        '/images/eternal6/842034237_122121242289417938_3343087035543472055_n.jpg',
        '/images/eternal6/839167560_122121242229417938_2917651611701043024_n.jpg'
      ]),
      isPublished: true,
      isFeatured: true,
      isPearlEdit: true,
    }
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log(`Created ${products.length} products.`);

  // Seed Hand Art Services
  const services = [
    {
      slug: 'bridal-mehendi',
      title: 'Bridal Mehendi Full Ceremony Package',
      description: 'Elaborate bridal mehendi up to elbows and feet with intricate traditional Indian, Arabic, and personalized portrait or motif elements. Includes 100% organic dark-stain henna cones and post-care herbal sealant.',
      category: 'bridal',
      startingPrice: 4500,
      duration: '4 - 6 Hours',
      image: '/images/eternal6/crops/ruby-red-zafran-karchupi.jpg',
      isPublished: true,
    },
    {
      slug: 'arabic-contemporary',
      title: 'Arabic Contemporary Hand Art',
      description: 'Bold flowing floral vines, shaded mandalas, and negative space geometry across both palms and wrists. High-contrast modern elegance for festive celebrations.',
      category: 'arabic',
      startingPrice: 1800,
      duration: '1.5 - 2 Hours',
      image: '/images/eternal6/crops/emerald-forest-zafran-embroidery.jpg',
      isPublished: true,
    },
    {
      slug: 'minimal-floral-wrist',
      title: 'Minimal Floral Wrist & Finger Art',
      description: 'Delicate lace cuffs, botanical finger bands, and micro-mandala centerpieces tailored for understated elegance and modern chic style.',
      category: 'minimal',
      startingPrice: 1200,
      duration: '1 Hour',
      image: '/images/eternal6/crops/blossom-pink-pearl-embroidery.jpg',
      isPublished: true,
    },
    {
      slug: 'engagement-reception',
      title: 'Engagement & Reception Hand Art',
      description: 'Refined semi-bridal coverage featuring delicate mesh netting (jaali), peacock rosettes, and tailored motifs customized to your outfit theme.',
      category: 'bridal',
      startingPrice: 2800,
      duration: '2.5 - 3 Hours',
      image: '/images/eternal6/crops/dark-emerald-pearl-scallop.jpg',
      isPublished: true,
    },
    {
      slug: 'festive-eid-mehendi',
      title: 'Festive & Eid Mehendi Styling',
      description: 'Celebration-ready designs for family gatherings, parties, and festive occasions across Chittagong. Group appointment discounts available.',
      category: 'festive',
      startingPrice: 1500,
      duration: '1.5 Hours',
      image: '/images/eternal6/crops/coral-rose-zafran-blockprint.jpg',
      isPublished: true,
    },
    {
      slug: 'custom-calligraphy-art',
      title: 'Custom Islamic Calligraphy & Canvas Art',
      description: 'Hand-painted miniature sacred art, customized name scrolls, and event gift favors tailored for meaningful milestones and keepsake gifting.',
      category: 'custom',
      startingPrice: 2000,
      duration: '3 - 5 Days Prep',
      image: '/images/eternal6/842034237_122121242289417938_3343087035543472055_n.jpg',
      isPublished: true,
    }
  ];

  for (const s of services) {
    await prisma.handArtService.create({ data: s });
  }
  console.log(`Created ${services.length} hand-art services.`);

  // Seed Customer Reviews (including genuine Facebook feedback)
  const reviews = [
    {
      customerName: 'Tanjina A.',
      location: 'Chattogram',
      comment: 'আলহামদুলিল্লাহ আজকে হাতে পেলাম, কাপড়ের কোয়ালিটি এবং ডিজাইন দুইটাই গতানুগতিক ধারার থেকে ভিন্ন অনেকটা ইউনিক। আশা করি সামনে আরো ইউনিক কিছু আনবেন। ও হ্যাঁ সারপ্রাইজ গিফটা দারুণ ছিলো, ধন্যবাদ এটার জন্য ❤️',
      rating: 5,
      isVerified: true,
      isFeatured: true,
    },
    {
      customerName: 'Samira Rahman',
      location: 'Nasirabad, Chittagong',
      comment: 'The Blossom Pink Pearl hijab from The Pearl Edit exceeded my expectations! The moti beads are firmly hand-stitched and the Zafran fabric is breathably soft for our weather.',
      rating: 5,
      isVerified: true,
      isFeatured: true,
    },
    {
      customerName: 'Nusrat Jahan',
      location: 'GEC Circle, Chattogram',
      comment: 'Booked their bridal mehendi for my engagement and ordered the emerald stone work hijab. The artist was on time and the stain was deep and rich maroon. Eternal 6 is now my favorite boutique in Chittagong.',
      rating: 5,
      isVerified: true,
      isFeatured: true,
    },
    {
      customerName: 'Farhana Chowdhury',
      location: 'Agrabad, Chattogram',
      comment: 'Cash on delivery reached me in less than 24 hours in Chittagong. The packaging came wrapped in silk ribbon with a thank-you note. Beautiful luxury touch!',
      rating: 5,
      isVerified: true,
      isFeatured: true,
    }
  ];

  for (const r of reviews) {
    await prisma.customerReview.create({ data: r });
  }
  console.log(`Created ${reviews.length} reviews.`);

  // Seed Site Settings
  const settings = [
    { key: 'announcement_text', value: '✨ Discover Your Elegance | Handcrafted Hijabs, Pearl Edits & Mehendi Art | Chittagong Boutique' },
    { key: 'announcement_enabled', value: 'true' },
    { key: 'business_name', value: 'Eternal 6 - Timeless Elegance' },
    { key: 'tagline', value: 'Timeless Elegance' },
    { key: 'business_location', value: 'Chittagong (Chattogram), Bangladesh' },
    { key: 'phone_number', value: '+880 1606-266496' },
    { key: 'whatsapp_number', value: '+880 1606-266496' },
    { key: 'email_address', value: 'eternal6six@gmail.com' },
    { key: 'facebook_url', value: 'https://www.facebook.com/eternalsix6' },
    { key: 'instagram_url', value: 'https://www.instagram.com/eternal6six' },
    { key: 'cod_enabled', value: 'true' },
    { key: 'bkash_enabled', value: 'true' },
    { key: 'bkash_merchant_number', value: '01606266496' },
    { key: 'nagad_enabled', value: 'true' },
    { key: 'nagad_merchant_number', value: '01606266496' },
    { key: 'chittagong_delivery_charge', value: '70' },
    { key: 'outside_chittagong_delivery_charge', value: '130' },
    { key: 'free_delivery_threshold', value: '2500' },
  ];

  for (const st of settings) {
    await prisma.siteSetting.create({ data: st });
  }
  console.log(`Created ${settings.length} site settings.`);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
