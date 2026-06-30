export interface Foundation {
  id: string;
  name: string;
  location: string;
  description: string;
  mission: string;
  verifiedNo: string;
  animalTypes: string[];
  bannerImage: string;
  thumbnailImage: string;
  urgent: boolean;
  coords: { x: number; y: number; name: string }; // Coordinates on our customized interactive map container (percentages)
}

export interface Pet {
  id: string;
  name: string;
  age: string;
  sex: 'male' | 'female';
  breed: string;
  tags: string[];
  location: string;
  mainImage: string;
  about: string;
  longAbout?: string;
  vaccinated: boolean;
  neutered: boolean;
  houseTrained: boolean;
  goodWithKids: boolean;
  category: 'dogs' | 'cats' | 'wildlife';
  foundationId: string;
}

export interface Donation {
  id: string;
  foundationId: string;
  foundationName: string;
  amount: number;
  date: string;
}

export interface SavedState {
  likedPets: string[]; // Pet IDs
  dislikedPets: string[]; // Pet IDs to filter them out of swiper
  donations: Donation[];
}
