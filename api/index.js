import axios from 'axios'
export default {
cats: {
    getAllCats: () => axios.get('/api/categories'),
},
items: {
    getItemsByCatName: (catName) => axios.get('/api/items?cat='+catName)
}
}