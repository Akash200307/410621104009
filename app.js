const express = require('express');
const app = express();
const port = 3000; // Choose your desired port

// Mock data for demonstration (replace with actual API calls)
const mockData = {
  AMZ: [
    { id: 'amz1', name: 'Laptop 1', price: 2236, rating: 4.7, discount: 63, availability: 'yes' },
    { id: 'amz2', name: 'Laptop 2', price: 1258, rating: 4.5, discount: 45, availability: 'yes' },
  ],
  FLP: [
    { id: 'flp1', name: 'Laptop 3', price: 9102, rating: 4.44, discount: 98, availability: 'out-of-stock' },
  ],
  SNP: [
    { id: 'snp1', name: 'Laptop 5', price: 1239, rating: 4.8, discount: 35, availability: 'yes' },
    { id: 'snp2', name: 'Laptop 6', price: 1567, rating: 4.6, discount: 26, availability: 'yes' },
  ],
  MYN: [
    { id: 'myn1', name: 'Laptop 7', price: 1234, rating: 4.9, discount: 75, availability: 'yes' },
    { id: 'myn2', name: 'Laptop 8', price: 1598, rating: 4.3, discount: 56, availability: 'yes' },
  ],
  AZO: [
    { id: 'azo1', name: 'Laptop 9', price: 1123, rating: 4.2, discount: 67, availability: 'yes' },
    { id: 'azo2', name: 'Laptop 10', price: 1234, rating: 4.1, discount: 56, availability: 'yes' },
  ],
};

// Route to retrieve top products in a category and price range
app.get('/categories/:categoryName/products', (req, res) => {
  const { categoryName } = req.params;
  const { top, minPrice, maxPrice, sort, page } = req.query;

  // Mock logic to fetch data (replace with actual API calls)
  let products = Object.values(mockData).flat().filter(product => product.category === categoryName);

  // Filter by price range
  if (minPrice && maxPrice) {
    products = products.filter(product => product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice));
  }

  // Sort products based on query parameters
  if (sort) {
    switch (sort) {
      case 'rating_desc':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        products.sort((a, b) => b.price - a.price);
        break;
      // Add cases for other sorting options like company, discount, etc.
      default:
        // Handle default case
        break;
    }
  }

  // Pagination
  let pageNumber = 1;
  let pageSize = top > 10 ? 10 : top;
  if (page) {
    pageNumber = parseInt(page);
  }
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);

  res.json({ products: paginatedProducts });
});

// Route to retrieve details of a specific product
app.get('/categories/:categoryName/products/:productId', (req, res) => {
  const { categoryName, productId } = req.params;

  // Mock logic to find product details (replace with actual API calls)
  const foundProduct = Object.values(mockData).flat().find(product => product.id === productId);

  if (foundProduct) {
    res.json(foundProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

