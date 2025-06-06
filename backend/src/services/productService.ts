import { ProductModel } from "../models/productModel";

export const getAllProducts = async () => {
    const products = await ProductModel.find();
    return products;
}

export const seedInitialProducts = async (): Promise<{ success: boolean; message: string }> => {
    try {
        const products = [
            {
                name: "Wireless Noise Cancelling Headphones",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format",
            price: 299.99,
            category: "Electronics",
            stock: 50,
            description: "Premium wireless headphones with active noise cancellation and 30-hour battery life"
        },
        {
            name: "Smart Fitness Watch",
            image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format",
            price: 199.99,
            category: "Electronics",
            stock: 75,
            description: "Track your fitness goals with heart rate monitoring and GPS"
        },
        {
            name: "Professional DSLR Camera",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format",
            price: 1299.99,
            category: "Electronics",
            stock: 25,
            description: "24.1MP DSLR camera with 4K video recording"
        },
        {
            name: "Leather Laptop Backpack",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format",
            price: 89.99,
            category: "Accessories",
            stock: 100,
            description: "Water-resistant leather backpack with laptop compartment"
        },
        {
            name: "Wireless Gaming Mouse",
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format",
            price: 79.99,
            category: "Electronics",
            stock: 60,
            description: "RGB gaming mouse with programmable buttons"
        },
        
     
        {
            name: "Portable Bluetooth Speaker",
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format",
            price: 129.99,
            category: "Electronics",
            stock: 80,
            description: "Waterproof portable speaker with 20-hour battery life"
        },
        {
            name: "Smart Home Security Camera",
            image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&auto=format",
            price: 89.99,
            category: "Electronics",
            stock: 55,
            description: "1080p security camera with night vision and motion detection"
        },
      
        {
            name: "Smart LED Light Strip",
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format",
            price: 49.99,
            category: "Electronics",
            stock: 90,
            description: "16 million colors, voice control, and music sync"
        }
    ];
    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
        await ProductModel.insertMany(products);
        return { success: true, message: 'Products seeded successfully' };
    }
    return { success: true, message: 'Products already exist in database' };
    } catch (error) {
        console.error('Error in seedInitialProducts:', error);
        return { 
            success: false, 
            message: error instanceof Error ? error.message : 'Failed to seed products'
        };
    }
}
