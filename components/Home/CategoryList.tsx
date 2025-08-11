import IconButton from '@/components/ui/IconButton';
import { Category } from '@/types/Category';
import { useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface Prop {
    currentCategory: Category;
    list: Category[];
    onCategoryChange: (category: Category) => void;
}
export default function CategoryList({
    currentCategory,
    list,
    onCategoryChange,
}: Prop) {
    const [category, setCategory] = useState<Category>(currentCategory);
    const [categoryList, setCategoryList] = useState<Category[]>(list);
    const scrollRef = useRef<ScrollView>(null);

    const scrollToStart = () => {
        scrollRef.current?.scrollTo({ x: 0, animated: true });
    };

    const scrollToEnd = () => {
        scrollRef.current?.scrollToEnd({ animated: true });
    };

    const handleCategory = (selectedCategory: Category) => {
        setCategory(selectedCategory);
        onCategoryChange(selectedCategory);
        if (selectedCategory === 'dessert') {
            scrollToEnd();
        }
        if (selectedCategory === 'popular') {
            scrollToStart();
        }
    };
    return (
        <ScrollView
            ref={scrollRef}
            style={styles.categoryList}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {categoryList.map((cat) => (
                <IconButton
                    key={cat}
                    category={cat}
                    active={category === cat}
                    onPress={handleCategory}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    categoryList: {
        paddingBottom: 30,
        marginHorizontal: -20,
        paddingHorizontal: 20,
        maxHeight: 140,
        gap: 10,
        overflowX: 'scroll',
    },
});
