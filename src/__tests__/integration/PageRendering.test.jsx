import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import Explore from '../../pages/Explore';
import Shop from '../../pages/Shop';
import { AuthProvider } from '../../context/AuthContext';
import { ThemeProvider } from '../../context/ThemeContext';
import { CartProvider } from '../../context/CartContext';
import { recipeAPI, productAPI, userAPI, notificationAPI } from '../../utils/api';

jest.mock('../../utils/api', () => ({
  recipeAPI: {
    getAll: jest.fn(),
  },
  productAPI: {
    getAll: jest.fn(),
  },
  userAPI: {
    getFavorites: jest.fn(),
    getProfile: jest.fn(),
  },
  notificationAPI: {
    getAll: jest.fn(),
  },
  authAPI: {
    login: jest.fn(),
  },
}));

const AllProviders = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('Page Rendering Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    recipeAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        recipes: [
          {
            _id: '1',
            title: 'Test Recipe',
            difficulty: 'Easy',
            time: 30,
            rating: 4.5,
            image: 'test.jpg',
            cuisine: 'Italian',
            tags: ['pasta'],
            cost: 15.99
          }
        ]
      }
    });

    productAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        products: [
          {
            _id: '1',
            name: 'Test Product',
            price: 9.99,
            image: 'product.jpg',
            category: 'Vegetables'
          }
        ]
      }
    });

    userAPI.getFavorites.mockResolvedValue({
      data: {
        success: true,
        favorites: []
      }
    });

    notificationAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        notifications: []
      }
    });
  });

  test('Home page loads and displays recipes from API', async () => {
    render(<Home />, { wrapper: AllProviders });

    await waitFor(() => {
      expect(recipeAPI.getAll).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    });
  });

  test('Explore page renders with navbar', async () => {
    render(<Explore />, { wrapper: AllProviders });

    await waitFor(() => {
      const foodiesElements = screen.getAllByText('FOODIES');
      expect(foodiesElements.length).toBeGreaterThan(0);
    });
  });

  test('Explore page loads recipes from API', async () => {
    render(<Explore />, { wrapper: AllProviders });

    await waitFor(() => {
      expect(recipeAPI.getAll).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    });
  });

  test('Shop page renders with navbar', async () => {
    render(<Shop />, { wrapper: AllProviders });

    await waitFor(() => {
      const foodiesElements = screen.getAllByText('FOODIES');
      expect(foodiesElements.length).toBeGreaterThan(0);
    });
  });

  test('Shop page loads products from API', async () => {
    render(<Shop />, { wrapper: AllProviders });

    await waitFor(() => {
      expect(productAPI.getAll).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
  });

  test('Multiple components work together on Home page', async () => {
    render(<Home />, { wrapper: AllProviders });

    await waitFor(() => {
      const foodiesElements = screen.getAllByText('FOODIES');
      expect(foodiesElements.length).toBeGreaterThan(0);
      expect(recipeAPI.getAll).toHaveBeenCalled();
    });

    const navbar = screen.getByText('Home');
    expect(navbar).toBeInTheDocument();
  });

  test('Context providers provide data to nested components', async () => {
    render(<Home />, { wrapper: AllProviders });

    await waitFor(() => {
      const foodiesElements = screen.getAllByText('FOODIES');
      expect(foodiesElements.length).toBeGreaterThan(0);
    });

    const signInLinks = screen.getAllByText(/sign in/i);
    expect(signInLinks.length).toBeGreaterThan(0);
  });

  test('Pages handle API errors gracefully', async () => {
    recipeAPI.getAll.mockRejectedValue(new Error('API Error'));

    render(<Home />, { wrapper: AllProviders });

    await waitFor(() => {
      const foodiesElements = screen.getAllByText('FOODIES');
      expect(foodiesElements.length).toBeGreaterThan(0);
    });
  });

  test('Recipe cards render with correct data structure', async () => {
    render(<Explore />, { wrapper: AllProviders });

    await waitFor(() => {
      expect(screen.getByText('Test Recipe')).toBeInTheDocument();
      expect(screen.getByText('Easy')).toBeInTheDocument();
      expect(screen.getByText('30 min')).toBeInTheDocument();
    });
  });
});

