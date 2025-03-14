import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    // Validate input
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Invalid input. Please provide a search query." }, { status: 400 });
    }

    // My smarty pants list of vegs&fruits 
    const data = [
        { id: 1, name: "Apple", type: "Fruit", growsIn: "Temperate regions (USA, Europe, China)", benefits: ["Rich in fiber", "Supports heart health", "Aids digestion"] },
        { id: 2, name: "Banana", type: "Fruit", growsIn: "Tropical regions (South America, Africa, Southeast Asia)", benefits: ["High in potassium", "Boosts energy", "Good for digestion"] },
        { id: 3, name: "Carrot", type: "Vegetable", growsIn: "Cooler climates (Europe, North America, Asia)", benefits: ["Improves eyesight", "Supports immune system", "Rich in beta-carotene"] },
        { id: 4, name: "Mango", type: "Fruit", growsIn: "Tropical regions (India, Brazil, Mexico)", benefits: ["Boosts immunity", "Good for skin", "High in vitamins A & C"] },
        { id: 5, name: "Broccoli", type: "Vegetable", growsIn: "Temperate climates (USA, China, Italy)", benefits: ["Rich in antioxidants", "Supports digestion", "Good for heart health"] },
        { id: 6, name: "Strawberry", type: "Fruit", growsIn: "Temperate regions (USA, Europe, Asia)", benefits: ["Rich in vitamin C", "Supports heart health", "Anti-inflammatory properties"] },
        { id: 7, name: "Spinach", type: "Vegetable", growsIn: "Cool and temperate regions (USA, China, India)", benefits: ["High in iron", "Supports bone health", "Boosts immune function"] },
        { id: 8, name: "Orange", type: "Fruit", growsIn: "Subtropical and tropical regions (Brazil, USA, India)", benefits: ["Boosts immune system", "High in vitamin C", "Supports skin health"] },
        { id: 9, name: "Potato", type: "Vegetable", growsIn: "Temperate regions (USA, China, Russia)", benefits: ["Good source of carbohydrates", "Provides potassium", "Supports digestion"] },
        { id: 10, name: "Grapes", type: "Fruit", growsIn: "Temperate and Mediterranean regions (Italy, Spain, USA)", benefits: ["Rich in antioxidants", "Supports heart health", "Improves brain function"] },
        { id: 11, name: "Pineapple", type: "Fruit", growsIn: "Tropical regions (Philippines, Thailand, Costa Rica)", benefits: ["Aids digestion", "Rich in vitamin C", "Supports immune function"] },
        { id: 12, name: "Onion", type: "Vegetable", growsIn: "Temperate and subtropical regions (China, India, USA)", benefits: ["Supports heart health", "Rich in antioxidants", "Boosts immunity"] },
        { id: 13, name: "Cucumber", type: "Vegetable", growsIn: "Temperate and tropical regions (China, India, Russia)", benefits: ["Hydrating properties", "Good for digestion", "Supports skin health"] },
        { id: 14, name: "Avocado", type: "Fruit", growsIn: "Tropical and subtropical regions (Mexico, Peru, Indonesia)", benefits: ["High in healthy fats", "Supports brain function", "Good for skin"] },
        { id: 15, name: "Tomato", type: "Fruit", growsIn: "Temperate and subtropical regions (China, India, USA)", benefits: ["Rich in lycopene", "Supports heart health", "Good for skin"] },
        { id: 16, name: "Watermelon", type: "Fruit", growsIn: "Warm climates (China, Turkey, USA)", benefits: ["Hydrating", "Rich in antioxidants", "Supports muscle recovery"] },
        { id: 17, name: "Pumpkin", type: "Vegetable", growsIn: "Temperate and subtropical regions (USA, China, India)", benefits: ["Rich in vitamin A", "Good for eyesight", "Supports immune function"] },
        { id: 18, name: "Papaya", type: "Fruit", growsIn: "Tropical regions (India, Indonesia, Brazil)", benefits: ["Aids digestion", "Rich in vitamin C", "Supports skin health"] },
        { id: 19, name: "Lettuce", type: "Vegetable", growsIn: "Cool and temperate regions (USA, China, India)", benefits: ["Low in calories", "Supports digestion", "Good for hydration"] },
        { id: 20, name: "Peach", type: "Fruit", growsIn: "Temperate regions (China, Italy, Spain)", benefits: ["Rich in vitamins", "Supports digestion", "Good for skin"] },
    ];

    // Search for items that include the user's input
    const results = data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
