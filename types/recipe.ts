export type RecipeResult = {
    strMeal: string;
    strMealThumb: string;
    idMeal: idMeal;
};

export type RecipeResultResp = {
    main: RecipeResult[];
};

export type Recipe = {
    idMeal: idMeal;
    name: string;
    mealAlternate: any;
    category: mealCategory;
    area: string;
    instructions: string;
    image: string;
    tags: string;
    youtubeLink: string;
    ingredients: ingredient[];
};

export type ingredient = {
    ingredient: string;
    measure: string | null;
};
export type idMeal = string & { __brand: 'numeric' };
export type mealCategory = 'chicken' | '';
