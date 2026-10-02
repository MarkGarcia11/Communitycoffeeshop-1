import React, { createContext, useContext, useState, useEffect } from "react";
import { readStoredArray, readStoredNumber, writeStoredValue } from "./storage";

// Types
export interface ClassEvent {
  id: string;
  title: string;
  teacher: string;
  day: string;
  time: string;
  cost: number;
  level: "Beginner" | "Intermediate" | "Intermediate Text Study" | "Advanced Text Study" | "Experiential Workshop";
  description: string;
  longDescription: string;
  whatToExpect: string;
  accessibility: string;
  spotsLeft: number;
  totalSpots: number;
  imageUrl: string;
  date: string;
  location: string;
}

export interface Product {
  id: string;
  title: string;
  category: "Coffee & Tea" | "Mugs & Gifts" | "Judaica & Ritual Items" | "Books & Study Materials" | "Gift Cards";
  price: number;
  description: string;
  details: string[];
  imageUrl: string;
  secondImageUrl: string;
  shippingNotes: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftMessage?: string;
}

export interface RSVP {
  id: string;
  classId: string;
  classTitle: string;
  name1: string;
  name2?: string;
  email: string;
  accessibilityNotes?: string;
  dietaryNotes?: string;
  created_at: string;
}

export interface Subscriber {
  email: string;
  interest: "coffee" | "learning" | "both";
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Donation {
  id: string;
  amount: number;
  frequency: "one-time" | "monthly";
  name: string;
  isJoint: boolean;
  jointName?: string;
  dedicationType?: "none" | "honor" | "memory";
  dedicationText?: string;
  coverFees: boolean;
  created_at: string;
}

interface AppContextType {
  classes: ClassEvent[];
  products: Product[];
  cart: CartItem[];
  rsvps: RSVP[];
  subscribers: Subscriber[];
  messages: ContactMessage[];
  donations: Donation[];
  goalRaised: number;
  goalTarget: number;
  isCartOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, giftMessage?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  submitRSVP: (rsvp: Omit<RSVP, "id" | "created_at">) => boolean;
  subscribeNewsletter: (email: string, interest?: "coffee" | "learning" | "both") => { success: boolean; msg: string };
  submitContact: (name: string, email: string, message: string) => boolean;
  submitDonation: (donation: Omit<Donation, "id" | "created_at">) => void;
  addClass: (newEvent: Omit<ClassEvent, "id">) => void;
  deleteClass: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_CLASSES: ClassEvent[] = [
  {
    id: "class-1",
    title: "Hassidut for the People",
    teacher: "Rabbi Mark Asher Goodman",
    day: "Tuesdays",
    time: "10:00 AM - 11:30 AM",
    cost: 18,
    level: "Beginner",
    description: "Explore the weekly Torah portion with the mystical and interpersonal lens of the Hassidic rabbis.",
    longDescription: "Explore the weekly Torah portion with the mystical and interpersonal lens of the Hassidic rabbis. Hassidut for the People is a fun and engaging class taught online and in-person meant to help learners find deeper meaning in Torah and in themselves. We dive into teachings from great 18th and 19th-century masters, turning abstract spiritual theory into accessible, personal, and practical wisdom for our lives and our relationships.",
    whatToExpect: "A highly collaborative group discussion over coffee. We will read short English translations of Hebrew mystical texts. No prior Hebrew knowledge or religious background required. Come as you are!",
    accessibility: "Wheelchair accessible, digital materials provided in large-print, relaxed seating available. Contact us for any sensory adjustments.",
    spotsLeft: 8,
    totalSpots: 15,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    date: "Weekly on Tuesdays",
    location: "Temporary space at 4300 Murray Ave (Renovation side-room) / Zoom hybrid"
  },
  {
    id: "class-2",
    title: "Mishkan Crafts & Sacred Text",
    teacher: "Frances Lasday",
    day: "Wednesdays",
    time: "7:00 PM - 8:30 PM",
    cost: 25,
    level: "Experiential Workshop",
    description: "Learn the secrets of the Tabernacle and Shabbat craft restrictions while weaving and spinning.",
    longDescription: "An experiential, hands-on workshop led by educator and organizer Frances Lasday. We will explore the Mishkan (the Tabernacle or portable sanctuary built in the wilderness) and the 39 Melachot (creative activities forbidden on Shabbat that trace back to the building of the Mishkan). We will learn the historical context while physically spinning wool, weaving fibers, and trying traditional crafts together. It's a wonderful blend of textile arts and Torah learning.",
    whatToExpect: "A busy, tactile workshop where you'll get your hands on fibers and small looms. Expect a cozy environment with light music, tea, and warm group sharing.",
    accessibility: "All materials included in cost. Safe for beginners. Left-handed craft tools available. Step-free workspace. Soft chairs.",
    spotsLeft: 4,
    totalSpots: 10,
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    date: "Weekly on Wednesdays starting October 14th",
    location: "Shoresh Space, 4300 Murray Ave, Pittsburgh"
  },
  {
    id: "class-3",
    title: "Talmud for the Well-Caffeinated",
    teacher: "Rabbi Mark Asher Goodman",
    day: "Thursdays",
    time: "7:30 PM - 9:00 PM",
    cost: 18,
    level: "Intermediate Text Study",
    description: "Masechet Rosh Hashanah - diving into the multiple new years that fill out the Jewish calendar.",
    longDescription: "Dive into Masechet Rosh Hashanah, a rich tractate of the Talmud that explores the multiple new years in Jewish law, how the calendar is sanctified, and what it means to mark time. Rabbi Mark Asher Goodman guides us through the original Aramaic text with standard commentaries (Rashi/Tosafot), making the debates feel relevant, lively, and intellectually stimulating. Bring your curiosity and analytical mind!",
    whatToExpect: "Partner-study (chevruta) for the first 30 minutes, followed by a collaborative guided shiur (lecture/discussion). We look closely at arguments, structure, and moral questions.",
    accessibility: "Bilingual source sheets (Hebrew/Aramaic with full English translations and glossaries) provided. Highly analytical but supportive environment.",
    spotsLeft: 12,
    totalSpots: 20,
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
    date: "Weekly on Thursdays",
    location: "Shoresh Space, 4300 Murray Ave"
  },
  {
    id: "class-4",
    title: "Intro to Jewish Mysticism (Kabbalah)",
    teacher: "Rabbi Mark Asher Goodman",
    day: "Sundays",
    time: "4:00 PM - 5:30 PM",
    cost: 18,
    level: "Beginner",
    description: "Demystifying the ten Sefirot (divine attributes) and how they manifest in our everyday relationships.",
    longDescription: "An entry-level guide to the basic concepts of Kabbalah (Jewish mysticism). We unpack the Ten Sefirot (channels of divine energy like kindness, boundaries, beauty, and action) and map them onto human psychology, coffee culture, and our relationships. It's a wonderful class for anyone who wants a structured introduction to Jewish mystical maps of the soul.",
    whatToExpect: "Visual presentations, group journaling exercises, and deep, quiet contemplation. Warm and open to all backgrounds.",
    accessibility: "Quiet room, sensory friendly lighting, written diagrams provided. Comfortable armchairs available.",
    spotsLeft: 10,
    totalSpots: 15,
    imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600&auto=format&fit=crop",
    date: "Weekly on Sundays",
    location: "Shoresh Space, 4300 Murray Ave, Pittsburgh"
  }
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Classic 'Well-Caffeinated' Diner Mug",
    category: "Mugs & Gifts",
    price: 18,
    description: "Heavy-duty ceramic diner mug featuring our hand-drawn Shoresh root logo.",
    details: [
      "Heavyweight natural ceramic (12oz)",
      "Shoresh-green logo print",
      "Dishwasher and microwave safe",
      "Feels incredibly substantial in two hands"
    ],
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    secondImageUrl: "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=600&auto=format&fit=crop",
    shippingNotes: "Ships within 2-3 business days in zero-waste cardboard packaging, or choose free Greenfield pickup.",
    inStock: true
  },
  {
    id: "prod-2",
    title: "Shoresh Greenfield Blend (Whole Bean)",
    category: "Coffee & Tea",
    price: 16,
    description: "A custom medium-dark roast with notes of rich honey, roasted almonds, and a hint of warm honey-crust.",
    details: [
      "12oz valve bag, fresh roasted locally",
      "Direct trade, organic beans from Huehuetenango, Guatemala",
      "Perfect for espresso or traditional drip coffee",
      "Roasted in small batches every Monday"
    ],
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop",
    secondImageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop",
    shippingNotes: "We roast and pack our bags fresh weekly. Sourcing details provided on the back label.",
    inStock: true
  },
  {
    id: "prod-3",
    title: "Handmade Braided Beeswax Havdalah Candle",
    category: "Judaica & Ritual Items",
    price: 14,
    description: "Beautifully braided multi-wick beeswax candle crafted during our Wednesday experiential classes.",
    details: [
      "100% natural Pennsylvania beeswax",
      "Braided 6-strand design with deep amber and cream hues",
      "Burns for approximately 4-5 hours with sweet natural honey scent",
      "Crafted by Shoresh community members in Greenfield"
    ],
    imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop",
    secondImageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop",
    shippingNotes: "Handmade item; slight variations in color and weave pattern are natural.",
    inStock: true
  },
  {
    id: "prod-4",
    title: "Steeped in Text: A Jewish Coffee Companion",
    category: "Books & Study Materials",
    price: 22,
    description: "Rabbi Mark Asher Goodman's collection of short essays, spiritual insights, and commentaries designed to be read over a cup of coffee.",
    details: [
      "220 pages, soft linen cover with gold foil accents",
      "Includes 36 short-form weekly Torah reflections",
      "Features beautiful hand-drawn root illustrations and Talmudic diagrams",
      "Signed copy by Rabbi Mark Asher Goodman"
    ],
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    secondImageUrl: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=600&auto=format&fit=crop",
    shippingNotes: "Includes a matching letterpress bookmark.",
    inStock: true
  },
  {
    id: "prod-5",
    title: "Shtibl Gift Card (Digital or Physical)",
    category: "Gift Cards",
    price: 25,
    description: "The perfect gift for neighbors and friends. Can be used for hot espresso drinks, fresh baked pastries, or evening classes.",
    details: [
      "Available in denominations of $25, $50, or $100",
      "Physical card is printed on heavy recycled kraft board",
      "Digital version can be instantly delivered via email",
      "No expiration date"
    ],
    imageUrl: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=600&auto=format&fit=crop",
    secondImageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
    shippingNotes: "Physical card ships free. Digital delivery is instantaneous.",
    inStock: true
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<ClassEvent[]>(() => readStoredArray("shoresh_classes", INITIAL_CLASSES));

  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  const [cart, setCart] = useState<CartItem[]>(() => readStoredArray<CartItem>("shoresh_cart", []));
  const [rsvps, setRsvps] = useState<RSVP[]>(() => readStoredArray<RSVP>("shoresh_rsvps", []));
  const [subscribers, setSubscribers] = useState<Subscriber[]>(() => readStoredArray<Subscriber>("shoresh_subscribers", []));
  const [messages, setMessages] = useState<ContactMessage[]>(() => readStoredArray<ContactMessage>("shoresh_messages", []));
  const [donations, setDonations] = useState<Donation[]>(() => readStoredArray<Donation>("shoresh_donations", []));

  // Demonstration figures, not verified fundraising totals.
  const [goalRaised, setGoalRaised] = useState(() => readStoredNumber("shoresh_raised", 118400));
  const goalTarget = 180000;
  const [isCartOpen, setCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // Sync state with localStorage
  useEffect(() => {
    writeStoredValue("shoresh_classes", classes);
  }, [classes]);

  useEffect(() => {
    writeStoredValue("shoresh_cart", cart);
  }, [cart]);

  useEffect(() => {
    writeStoredValue("shoresh_rsvps", rsvps);
  }, [rsvps]);

  useEffect(() => {
    writeStoredValue("shoresh_subscribers", subscribers);
  }, [subscribers]);

  useEffect(() => {
    writeStoredValue("shoresh_messages", messages);
  }, [messages]);

  useEffect(() => {
    writeStoredValue("shoresh_donations", donations);
  }, [donations]);

  useEffect(() => {
    writeStoredValue("shoresh_raised", goalRaised);
  }, [goalRaised]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, giftMessage?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, giftMessage }
            : item
        );
      }
      return [...prev, { product, quantity, giftMessage }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // RSVP submission (simulate Supabase insert and transactional decrement)
  const submitRSVP = (rsvpData: Omit<RSVP, "id" | "created_at">) => {
    const newRsvp: RSVP = {
      ...rsvpData,
      id: "rsvp-" + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    setRsvps((prev) => [newRsvp, ...prev]);

    // Update spots left for that class
    setClasses((prev) =>
      prev.map((c) => {
        if (c.id === rsvpData.classId) {
          const decreaseBy = rsvpData.name2 ? 2 : 1;
          return { ...c, spotsLeft: Math.max(0, c.spotsLeft - decreaseBy) };
        }
        return c;
      })
    );
    return true;
  };

  // Newsletter signup (simulate Supabase subscriber insert)
  const subscribeNewsletter = (email: string, interest: "coffee" | "learning" | "both" = "both") => {
    const exists = subscribers.some((sub) => sub.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, msg: "This email is already subscribed!" };
    }
    const newSub: Subscriber = {
      email,
      interest,
      created_at: new Date().toISOString()
    };
    setSubscribers((prev) => [newSub, ...prev]);
    return { success: true, msg: "Saved to this browser's preview list. Live email updates will activate when the newsletter service is connected." };
  };

  // Contact form submission (simulate Supabase contact message insert)
  const submitContact = (name: string, email: string, message: string) => {
    const newMessage: ContactMessage = {
      id: "msg-" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      message,
      created_at: new Date().toISOString()
    };
    setMessages((prev) => [newMessage, ...prev]);
    return true;
  };

  // Donation submission (simulate Stripe checkouts & Supabase log)
  const submitDonation = (donationData: Omit<Donation, "id" | "created_at">) => {
    const newDonation: Donation = {
      ...donationData,
      id: "don-" + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    setDonations((prev) => [newDonation, ...prev]);

    // Increase progress bar raised funds
    setGoalRaised((prev) => prev + donationData.amount);
  };

  // Admin capabilities (adding classes dynamically)
  const addClass = (newEvent: Omit<ClassEvent, "id">) => {
    const newId = "class-" + Math.random().toString(36).substr(2, 9);
    setClasses((prev) => [...prev, { ...newEvent, id: newId }]);
  };

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        classes,
        products,
        cart,
        rsvps,
        subscribers,
        messages,
        donations,
        goalRaised,
        goalTarget,
        isCartOpen,
        activeTab,
        setActiveTab,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        submitRSVP,
        subscribeNewsletter,
        submitContact,
        submitDonation,
        addClass,
        deleteClass
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
