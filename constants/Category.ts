import { Category } from '@/types/Category';

export const categories: Category[] = [
    'popular',
    'starter',
    'main',
    'side',
    'dessert',
];

export const categoryTitle = {
    popular: 'Most Loved Recipes',
    starter: 'Tasty Starters',
    main: 'Delicious Main Courses',
    side: 'Savory Sides',
    dessert: 'Sweet Treats & Desserts',
};

type CategoryRecipe = {
    [K in Category]: string[];
};
export const indexRecipes: CategoryRecipe = {
    popular: ['52796', '52775', '52898', '52854', '53034', '52935'],
    starter: [
        '52779',
        '52852',
        '52777',
        '52797',
        '52841',
        '52906',

        '53081',
        '52842',
    ],
    main: [
        '53073',
        '52827',
        '52993',
        '52810',
        '52907',
        '52845',
        '52908',
        '53012',
    ],
    dessert: [
        '52857',
        '53082',
        '52859',
        '52897',
        '52990',
        '52833',
        '52891',
        '52888',
        '52909',
        '53015',
        '52931',
        '52899',
        '52858',
    ],
    side: [
        '52912',
        '53043',
        '53026',
        '52866',
        '52919',
        '52914',
        '52978',
        '52922',
    ],
};
