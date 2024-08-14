export type RootStackParamList = {
    Home: undefined;
    Detail: { sport: Sport };
    Cart: { sport: Sport };
    Olympics: undefined;
};
  
export type Sport = {
    id: number;
    title: string;
    sportDescription: string;
    sportPrice: number;
    sportImage: string;
    imageUrl?: string;
}
  