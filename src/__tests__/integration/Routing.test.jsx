import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import { AuthProvider } from '../../context/AuthContext';
import { CartProvider } from '../../context/CartContext';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Explore from '../../pages/Explore';
import Shop from '../../pages/Shop';
import Collections from '../../pages/Collections';
import { recipeAPI, userAPI, productAPI, notificationAPI, authAPI, collectionAPI } from '../../utils/api';

jest.mock('../../utils/api', () => ({
  recipeAPI: {
    getAll: jest.fn(),
  },
  userAPI: {
    getFavorites: jest.fn(),
    getProfile: jest.fn(),
  },
  authAPI: {
    login: jest.fn(),
    register: jest.fn(),
  },
  productAPI: {
    getAll: jest.fn(),
  },
  notificationAPI: {
    getAll: jest.fn(),
  },
  collectionAPI: {
    getAll: jest.fn(),
  },
}));

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/collections" element={<Collections />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('Routing Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    recipeAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        recipes: []
      }
    });
    userAPI.getFavorites.mockResolvedValue({
      data: {
        success: true,
        favorites: []
      }
    });
    productAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        products: []
      }
    });
    notificationAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        notifications: []
      }
    });
    collectionAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        collections: []
      }
    });
  });

  test('navigates to home page by default', async () => {
    renderWithRouter('/');

    await waitFor(() => {
      const foodiesElements = screen.getAllByText('FOODIES');
      expect(foodiesElements.length).toBeGreaterThan(0);
    });
  });

  test('navigates to login page', async () => {
    renderWithRouter('/login');

    await waitFor(() => {
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });
  });

  test('navigates to signup page', async () => {
    renderWithRouter('/signup');

    await waitFor(() => {
      const foodiesElements = screen.getAllByText('FOODIES');
      expect(foodiesElements.length).toBeGreaterThan(0);
    });
  });

  test('navigates to explore page', async () => {
    renderWithRouter('/explore');

    await waitFor(() => {
      expect(screen.getAllByText(/explore/i).length).toBeGreaterThan(0);
    });
  });

  test('navigates to shop page', async () => {
    renderWithRouter('/shop');

    await waitFor(() => {
      expect(screen.getAllByText(/shop/i).length).toBeGreaterThan(0);
    });
  });

  test('navigates to collections page', async () => {
    renderWithRouter('/collections');

    await waitFor(() => {
      expect(screen.getAllByText(/collections/i).length).toBeGreaterThan(0);
    });
  });

  test('renders navbar and navigation elements', async () => {
    renderWithRouter('/');

    await waitFor(() => {
      const foodiesElements = screen.getAllByText('FOODIES');
      expect(foodiesElements.length).toBeGreaterThan(0);
    });

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  test('all routes render without crashing', async () => {
    renderWithRouter('/');

    await waitFor(() => {
      const foodiesElements = screen.getAllByText('FOODIES');
      expect(foodiesElements.length).toBeGreaterThan(0);
    });
  });

  test('context providers work correctly', async () => {
    renderWithRouter('/');

    await waitFor(() => {
      const signInLinks = screen.getAllByText(/sign in/i);
      expect(signInLinks.length).toBeGreaterThan(0);
    });
  });

  test('routes load without errors', async () => {
    const routes = ['/', '/login', '/signup', '/explore', '/shop', '/collections'];

    for (const route of routes) {
      const { unmount } = renderWithRouter(route);

      await waitFor(() => {
        const foodiesElements = screen.getAllByText('FOODIES');
        expect(foodiesElements.length).toBeGreaterThan(0);
      });

      unmount();
    }
  });
});

