
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, CalendarIcon, LogOut, Menu, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import LilyPadLogo from "@/components/LilyPadLogo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header: React.FC = () => {
  const { authState, signOut } = useAuth();
  const { user } = authState;
  const { t } = useLanguage();

  return (
    <header className="mb-8 relative">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0 flex items-center">
          <LilyPadLogo className="hidden sm:flex mr-3" />
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary flex items-center">
              <LilyPadLogo size="small" className="sm:hidden mr-2" />
              Lilly
            </h1>
            <p className="text-lg text-gray-600">{t('header.subtitle')}</p>
          </div>
        </div>
        
        {user && (
          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            <LanguageToggle />
            
            <div className="hidden sm:block">
              <Link to="/products">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('button.products')}</span>
                </Button>
              </Link>
            </div>
            
            <div className="hidden sm:block">
              <Link to="/calendar">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>{t('button.calendar')}</span>
                </Button>
              </Link>
            </div>
            
            <div className="hidden sm:block">
              <Link to="/rewards">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                >
                  <Star className="w-4 h-4" />
                  <span>Rewards</span>
                </Button>
              </Link>
            </div>
            
            <div className="hidden sm:block">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('button.signOut')}</span>
              </Button>
            </div>
            
            {/* Mobile navigation menu */}
            <div className="sm:hidden">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white">
                      <Menu className="w-4 h-4 mr-1" />
                      {t('navigation.menu')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[200px] bg-white p-2 rounded-md shadow-md">
                        <Link to="/products" className="block p-2 hover:bg-muted rounded-md">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            {t('button.products')}
                          </div>
                        </Link>
                        <Link to="/calendar" className="block p-2 hover:bg-muted rounded-md">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            {t('button.calendar')}
                          </div>
                        </Link>
                        <Link to="/rewards" className="block p-2 hover:bg-muted rounded-md">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Rewards
                          </div>
                        </Link>
                        <button 
                          onClick={signOut}
                          className="w-full text-left p-2 hover:bg-muted rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <LogOut className="w-4 h-4" />
                            {t('button.signOut')}
                          </div>
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        )}
        
        {!user && (
          <div className="flex items-center">
            <LanguageToggle />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
