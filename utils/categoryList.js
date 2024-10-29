export default class CategoryList {
    constructor(initialCategories = []) {
      this.categories = initialCategories;
    }
  
    addCategory(name) {
      const newCategory = {
        id: Math.floor(10000 + Math.random() * 90000).toString(),
        name: name
      };
      this.categories.push(newCategory);
      return newCategory;
    }
  
    deleteCategory(id) {
      const catIndex = this.categories.findIndex((cat) => cat.id === id);
      if (catIndex !== -1) {
        const deletedCat = this.categories[catIndex];
        this.categories = this.categories.filter(category => category.id !== id);
        return deletedCat;
      }
      return null;
    }
  
    editCategory(id, newName) {
      const category = this.categories.find(category => category.id === id);
      if (category) {
        category.name = newName;
      }
      return category
    }
  
    getCategories() {
      return this.categories;
    }

    getId(id) {
        return this.categories.find(category => category.id === id)
    }
  }