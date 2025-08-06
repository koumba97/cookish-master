import { Image } from 'react-native';

export async function getIngredientImage(
    ingredientName: string
): Promise<string> {
    const formatIngredient = ingredientName.toLowerCase().replace(' ', '-');
    const imgUrl = `https://www.themealdb.com/images/ingredients/${formatIngredient}.png`;

    return new Promise((resolve) => {
        Image.getSize(
            imgUrl,
            () => {
                resolve(imgUrl); // ✅ L'image existe
            },
            () => {
                resolve(
                    'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
                ); // ❌ fallback
            }
        );
    });
}
