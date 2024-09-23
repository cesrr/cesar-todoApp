export default class CategoryList {
    constructor(initialCategories = []) {
      this.categories = initialCategories;
    }
  
    addCategory(name) {
      const newCategory = {
        id: Date.now().toString(),
        name: name
      };
      this.categories.push(newCategory);
      return newCategory;
    }
  
    deleteCategory(id) {
      this.categories = this.categories.filter(category => category.id !== id);
    }
  
    editCategory(id, newName) {
      const category = this.categories.find(category => category.id === id);
      if (category) {
        category.name = newName;
      }
    }
  
    getCategories() {
      return this.categories;
    }

    getId(id) {
        return this.categories.find(category => category.id === id)
    }
  }