
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-qron-dark text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-qron-secondary">QRON</h3>
            <p className="text-sm text-gray-300">
              {t('qron_subtitle')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="/menu" className="text-gray-300 hover:text-qron-secondary transition-colors">{t('menu')}</a></li>
              <li><a href="/cart" className="text-gray-300 hover:text-qron-secondary transition-colors">{t('cart')}</a></li>
              <li><a href="/admin" className="text-gray-300 hover:text-qron-secondary transition-colors">{t('admin_dashboard')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-300">
              <p>Email: info@qron.example</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} QRON. {t('all_rights_reserved')}</p>
        </div>
      </div>
    </footer>
  );
}
