import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const templateSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    priceRange: String,
    images: [String],
    features: [String],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Template = mongoose.model('Template', templateSchema);

const seedTemplates = [
    {
        title: "Acoustic Boarding System",
        description: "Professional grade acoustic treatment for home theaters and commercial offices. Perfect for noise reduction and sound clarity.",
        category: "Interior Finishing Boarding",
        priceRange: "$$$",
        images: ["https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800"],
        features: ["Sound Dampening", "Eco-friendly Materials", "Custom Textures", "Fire Resistant"]
    },
    {
        title: "Decorative Walnut Paneling",
        description: "Premium natural walnut wood boarding for luxury living spaces. Adds warmth and architectural depth to any room.",
        category: "Interior Finishing Boarding",
        priceRange: "$$$$",
        images: ["https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800"],
        features: ["Solid Walnut", "Precision Jointing", "Stain-resistant Finish", "Integrated Lighting Options"]
    },
    {
        title: "Moisture-Shield Boarding",
        description: "Advanced moisture-resistant boarding designed for spas, bathrooms, and high-humidity environments.",
        category: "Interior Finishing Boarding",
        priceRange: "$$",
        images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"],
        features: ["Vapor Barrier", "Anti-mold Coating", "Easy Installation", "Durable Surface"]
    },
    {
        title: "Industrial Cement Boarding",
        description: "Raw, minimalist cement finish boarding for an industrial loft aesthetic. Highly durable and impact resistant.",
        category: "Interior Finishing Boarding",
        priceRange: "$$$",
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"],
        features: ["Impact Resistant", "Non-combustible", "Texture Variations", "UV Stable"]
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Optional: Clear existing templates for this category to avoid duplicates during testing
        // await Template.deleteMany({ category: "Interior Finishing Boarding" });

        await Template.insertMany(seedTemplates);
        console.log('Seeded templates successfully');

        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
