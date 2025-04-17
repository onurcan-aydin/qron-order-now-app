
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Language } from "@/types";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoImage from "@/assets/qron-logo.png";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={LogoImage} 
            alt="QRON Logo" 
            className="h-10 w-auto" 
          />
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/menu" className="hover:text-qron-primary transition-colors">
            {t('menu')}
          </Link>
          <div className="flex gap-2">
            <button 
              onClick={() => setLanguage(Language.ENGLISH)}
              className={`px-2 py-1 rounded ${language === Language.ENGLISH ? 'bg-qron-primary text-white' : 'bg-gray-100'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage(Language.GERMAN)}
              className={`px-2 py-1 rounded ${language === Language.GERMAN ? 'bg-qron-primary text-white' : 'bg-gray-100'}`}
            >
              DE
            </button>
            <button 
              onClick={() => setLanguage(Language.TURKISH)}
              className={`px-2 py-1 rounded ${language === Language.TURKISH ? 'bg-qron-primary text-white' : 'bg-gray-100'}`}
            >
              TR
            </button>
          </div>
          <Link to="/cart">
            <Button variant="ghost" className="relative">
              <ShoppingCart />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-qron-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="outline">{t('admin_login')}</Button>
          </Link>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
            <div className="flex flex-col p-4 gap-4">
              <Link 
                to="/menu" 
                className="py-2 hover:text-qron-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('menu')}
              </Link>
              <div className="flex gap-2 py-2">
                <button 
                  onClick={() => {
                    setLanguage(Language.ENGLISH);
                    setIsMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded ${language === Language.ENGLISH ? 'bg-qron-primary text-white' : 'bg-gray-100'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => {
                    setLanguage(Language.GERMAN);
                    setIsMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded ${language === Language.GERMAN ? 'bg-qron-primary text-white' : 'bg-gray-100'}`}
                >
                  DE
                </button>
                <button 
                  onClick={() => {
                    setLanguage(Language.TURKISH);
                    setIsMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded ${language === Language.TURKISH ? 'bg-qron-primary text-white' : 'bg-gray-100'}`}
                >
                  TR
                </button>
              </div>
              <Link 
                to="/cart" 
                className="py-2 flex items-center gap-2 hover:text-qron-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                {t('cart')}
                {itemCount > 0 && (
                  <span className="bg-qron-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </Link>
              <Link 
                to="/admin" 
                className="py-2 hover:text-qron-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('admin_login')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
