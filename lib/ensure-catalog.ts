import {prisma} from './prisma';
import {products} from './products';

function imageSrc(image: (typeof products)[number]['image']) {
  return typeof image === 'string' ? image : image.src;
}

export async function ensureCatalogProducts(ids: string[]) {
  const wanted = products.filter((product) => ids.includes(product.id));
  if (!wanted.length) return [];

  const owner = await prisma.user.upsert({
    where: {email: 'shop@dammytmotionwears.ng'},
    update: {name: 'Dammy T & Motion Wears', role: 'SELLER'},
    create: {email: 'shop@dammytmotionwears.ng', name: 'Dammy T & Motion Wears', role: 'SELLER'},
  });

  const seller = await prisma.seller.upsert({
    where: {userId: owner.id},
    update: {storeName: 'Dammy T & Motion Wears', approved: true, verified: true},
    create: {userId: owner.id, storeName: 'Dammy T & Motion Wears', approved: true, verified: true},
  });

  const categories = Object.fromEntries(
    await Promise.all(
      ['Women', 'Men', 'Shoes'].map(async (name) => [
        name,
        (
          await prisma.category.upsert({
            where: {slug: name.toLowerCase()},
            update: {name},
            create: {name, slug: name.toLowerCase()},
          })
        ).id,
      ]),
    ),
  );

  return Promise.all(
    wanted.map((product) =>
      prisma.product.upsert({
        where: {id: product.id},
        update: {
          name: product.name,
          price: product.price,
          sizes: product.sizes,
          stock: product.stock,
          active: true,
          images: [imageSrc(product.image)],
        },
        create: {
          id: product.id,
          sellerId: seller.id,
          categoryId: categories[product.category],
          name: product.name,
          slug: `${product.id}-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          description: `${product.name} from Dammy T & Motion Wears.`,
          price: product.price,
          images: [imageSrc(product.image)],
          sizes: product.sizes,
          colors: [product.color],
          stock: product.stock,
          rating: product.rating,
          reviewCount: product.reviews,
          active: true,
        },
      }),
    ),
  );
}
