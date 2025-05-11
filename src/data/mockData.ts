import { Service, Category, GalleryImage } from '../types';

export const mockData = {
  services: [
    {
      id: '1',
      name: 'Catering Services',
      description: 'Exquisite food arrangements for your wedding day with a variety of cuisines and presentation styles.',
      thumbnail: 'https://images.pexels.com/photos/5875017/pexels-photo-5875017.jpeg',
      icon: 'UtensilsCrossed'
    },
    {
      id: '2',
      name: 'Mandap & Decoration',
      description: 'Beautiful and elegant decorations for your wedding venue, mandap designs, and overall aesthetic arrangements.',
      thumbnail: 'https://images.pexels.com/photos/2788488/pexels-photo-2788488.jpeg',
      icon: 'Flower'
    },
    {
      id: '3',
      name: 'Photography',
      description: 'Capture your special moments with our professional photography and videography services.',
      thumbnail: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
      icon: 'Camera'
    }
  ] as Service[],

  categories: [
    // Catering categories
    {
      id: '101',
      serviceId: '1',
      name: 'Vegetarian',
      description: 'Pure vegetarian delicacies from around India and the world.',
      thumbnail: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'
    },
    {
      id: '102',
      serviceId: '1',
      name: 'Non-Vegetarian',
      description: 'Delicious non-vegetarian specialties for your guests.',
      thumbnail: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg'
    },
    {
      id: '103',
      serviceId: '1',
      name: 'Buffet Styles',
      description: 'Various buffet arrangements for smooth serving experience.',
      thumbnail: 'https://images.pexels.com/photos/5409097/pexels-photo-5409097.jpeg'
    },

    // Decoration categories
    {
      id: '201',
      serviceId: '2',
      name: 'Traditional',
      description: 'Classic traditional decor setups with cultural elements.',
      thumbnail: 'https://images.pexels.com/photos/3352722/pexels-photo-3352722.jpeg'
    },
    {
      id: '202',
      serviceId: '2',
      name: 'Modern',
      description: 'Contemporary themes with elegant styling and modern aesthetics.',
      thumbnail: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg'
    },
    {
      id: '203',
      serviceId: '2',
      name: 'Floral Themes',
      description: 'Beautiful floral arrangements and themes for your special day.',
      thumbnail: 'https://images.pexels.com/photos/931178/pexels-photo-931178.jpeg'
    },

    // Photography categories
    {
      id: '301',
      serviceId: '3',
      name: 'Pre-Wedding',
      description: 'Capture beautiful moments before your wedding day.',
      thumbnail: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg'
    },
    {
      id: '302',
      serviceId: '3',
      name: 'Wedding Day',
      description: 'Professional coverage of your entire wedding ceremony.',
      thumbnail: 'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg'
    },
    {
      id: '303',
      serviceId: '3',
      name: 'Candid',
      description: 'Natural, unposed moments captured throughout your celebrations.',
      thumbnail: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg'
    }
  ] as Category[],

  images: [
    // Vegetarian catering images
    {
      id: '1001',
      categoryId: '101',
      url: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
      caption: 'Elegant vegetarian appetizers'
    },
    {
      id: '1002',
      categoryId: '101',
      url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      caption: 'Fresh salad presentation'
    },
    {
      id: '1003',
      categoryId: '101',
      url: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
      caption: 'Traditional vegetarian thali'
    },

    // Non-vegetarian catering images
    {
      id: '1004',
      categoryId: '102',
      url: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg',
      caption: 'Grilled specialties'
    },
    {
      id: '1005',
      categoryId: '102',
      url: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg',
      caption: 'Seafood delicacies'
    },
    {
      id: '1006',
      categoryId: '102',
      url: 'https://images.pexels.com/photos/2689419/pexels-photo-2689419.jpeg',
      caption: 'Chicken specialties'
    },

    // Buffet images
    {
      id: '1007',
      categoryId: '103',
      url: 'https://images.pexels.com/photos/5409097/pexels-photo-5409097.jpeg',
      caption: 'Wedding buffet setup'
    },
    {
      id: '1008',
      categoryId: '103',
      url: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg',
      caption: 'Elegant food station'
    },
    {
      id: '1009',
      categoryId: '103',
      url: 'https://images.pexels.com/photos/1850595/pexels-photo-1850595.jpeg',
      caption: 'Dessert buffet display'
    },

    // Traditional decoration images
    {
      id: '2001',
      categoryId: '201',
      url: 'https://images.pexels.com/photos/3352722/pexels-photo-3352722.jpeg',
      caption: 'Traditional mandap decoration'
    },
    {
      id: '2002',
      categoryId: '201',
      url: 'https://images.pexels.com/photos/929443/pexels-photo-929443.jpeg',
      caption: 'Cultural wedding decorations'
    },
    {
      id: '2003',
      categoryId: '201',
      url: 'https://images.pexels.com/photos/3585798/pexels-photo-3585798.jpeg',
      caption: 'Classic wedding entry'
    },

    // Modern decoration images
    {
      id: '2004',
      categoryId: '202',
      url: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg',
      caption: 'Contemporary venue styling'
    },
    {
      id: '2005',
      categoryId: '202',
      url: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      caption: 'Minimalist wedding setup'
    },
    {
      id: '2006',
      categoryId: '202',
      url: 'https://images.pexels.com/photos/2498392/pexels-photo-2498392.jpeg',
      caption: 'Modern table arrangements'
    },

    // Floral decoration images
    {
      id: '2007',
      categoryId: '203',
      url: 'https://images.pexels.com/photos/931178/pexels-photo-931178.jpeg',
      caption: 'Floral arch decorations'
    },
    {
      id: '2008',
      categoryId: '203',
      url: 'https://images.pexels.com/photos/931154/pexels-photo-931154.jpeg',
      caption: 'Elegant floral centerpieces'
    },
    {
      id: '2009',
      categoryId: '203',
      url: 'https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg',
      caption: 'Floral wedding decor'
    },

    // Pre-wedding photography images
    {
      id: '3001',
      categoryId: '301',
      url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
      caption: 'Pre-wedding photoshoot'
    },
    {
      id: '3002',
      categoryId: '301',
      url: 'https://images.pexels.com/photos/1231442/pexels-photo-1231442.jpeg',
      caption: 'Engagement session'
    },
    {
      id: '3003',
      categoryId: '301',
      url: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg',
      caption: 'Couple portraits before the wedding'
    },

    // Wedding day photography images
    {
      id: '3004',
      categoryId: '302',
      url: 'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg',
      caption: 'Wedding ceremony photography'
    },
    {
      id: '3005',
      categoryId: '302',
      url: 'https://images.pexels.com/photos/1345085/pexels-photo-1345085.jpeg',
      caption: 'Bridal photography'
    },
    {
      id: '3006',
      categoryId: '302',
      url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
      caption: 'Wedding day special moments'
    },

    // Candid photography images
    {
      id: '3007',
      categoryId: '303',
      url: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg',
      caption: 'Candid moments during wedding'
    },
    {
      id: '3008',
      categoryId: '303',
      url: 'https://images.pexels.com/photos/3014853/pexels-photo-3014853.jpeg',
      caption: 'Natural wedding photography'
    },
    {
      id: '3009',
      categoryId: '303',
      url: 'https://images.pexels.com/photos/2253867/pexels-photo-2253867.jpeg',
      caption: 'Spontaneous wedding moments'
    }
  ] as GalleryImage[]
};