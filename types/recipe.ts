export type RecipeResult = {
    strMeal: string;
    strMealThumb: string;
    idMeal: string & { __brand: 'numeric' };
};

export type RecipeResultResp = {
    main: RecipeResult[];
};

export type Recipe = {};
