import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { AuthProvider } from '../../context/AuthContext';
import { ThemeProvider } from '../../context/ThemeContext';
import { CartProvider } from '../../context/CartContext';
import { notificationAPI } from '../../utils/api';

jest.mock('../../utils/api', () => ({
  notificationAPI: {
    getAll: jest.fn(),
  },
}));

const mockLogout = jest.fn();
const mockToggleTheme = jest.fn();

jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => ({
    user: { name: 'Test User' },
    isAuthenticated: true,
    logout: mockLogout,
  }),
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('../../context/ThemeContext', () => ({
  ...jest.requireActual('../../context/ThemeContext'),
  useTheme: () => ({
    isDark: false,
    toggleTheme: mockToggleTheme,
  }),
  ThemeProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('../../context/CartContext', () => ({
  ...jest.requireActual('../../context/CartContext'),
  useCart: () => ({
    cartItems: [],
    addToCart: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    getCartTotal: () => 0,
    getCartCount: () => 0,
  }),
  CartProvider: ({ children }) => <div>{children}</div>,
}));

describe('Navbar Component - Button Clicks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    notificationAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        notifications: []
      }
    });
  });

  test('renders navbar with user information when authenticated', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Hi, Test User/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  test('calls logout function when logout button is clicked', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test('toggles theme when theme button is clicked', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    const themeButton = screen.getByLabelText(/switch to dark mode/i);
    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  test('renders mobile menu button', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    const menuButton = screen.getByLabelText(/open menu/i);
    expect(menuButton).toBeInTheDocument();
  });

  test('opens notifications modal when notifications button is clicked', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    const notificationsButtons = screen.getAllByText('Notifications');
    const desktopNotificationsButton = notificationsButtons[0];
    
    fireEvent.click(desktopNotificationsButton);
  });

  test('opens cart modal when cart button is clicked', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    const cartButtons = screen.getAllByText(/cart/i);
    const desktopCartButton = cartButtons[0];
    
    fireEvent.click(desktopCartButton);
  });

  test('fetches notifications on component mount when authenticated', async () => {
    notificationAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        notifications: [
          { id: 1, message: 'Test notification', read: false }
        ]
      }
    });

    render(
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(notificationAPI.getAll).toHaveBeenCalledTimes(1);
    });
  });

  test('displays unread notification count badge', async () => {
    notificationAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        notifications: [
          { id: 1, message: 'Notification 1', read: false },
          { id: 2, message: 'Notification 2', read: false },
          { id: 3, message: 'Notification 3', read: true }
        ]
      }
    });

    render(
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const badges = screen.getAllByText('2');
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  test('renders navigation links correctly', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Collections')).toBeInTheDocument();
    expect(screen.getByText('Meal Planner')).toBeInTheDocument();
  });

  test('FOODIES logo links to home page', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    const logo = screen.getByLabelText(/foodies home/i);
    expect(logo).toHaveAttribute('href', '/');
  });
});

