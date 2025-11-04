import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  ChevronDown, 
  Search, 
  Bell, 
  ShoppingCart, 
  User 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      {/* Top Navigation Bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="text-2xl tracking-wide">
              FOODIES
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  placeholder="ingredient, dish"
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Dropdown Menus */}
          <div className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-orange-500">
                Recipes <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/recipes">All Recipes</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/recipes">By Cuisine</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/recipes">By Diet</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-orange-500">
                Collections <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Quick & Easy</DropdownMenuItem>
                <DropdownMenuItem>Healthy Options</DropdownMenuItem>
                <DropdownMenuItem>Comfort Food</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-orange-500">
                Cravings <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Sweet</DropdownMenuItem>
                <DropdownMenuItem>Savory</DropdownMenuItem>
                <DropdownMenuItem>Spicy</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-orange-500">
                Budget <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Under $10</DropdownMenuItem>
                <DropdownMenuItem>Under $20</DropdownMenuItem>
                <DropdownMenuItem>Premium</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile">
                <User className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="ingredient, dish"
            className="pl-10"
          />
        </div>
      </div>
    </header>
  );
}
