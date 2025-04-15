import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translations for the MVP
const translations: Record<Language, Record<string, string>> = {
  [Language.ENGLISH]: {
    menu: 'Menu',
    cart: 'Cart',
    order: 'Order',
    checkout: 'Checkout',
    total: 'Total',
    addToCart: 'Add to Cart',
    remove: 'Remove',
    placeOrder: 'Place Order',
    orderConfirmed: 'Order Confirmed',
    orderDetails: 'Order Details',
    payment: 'Payment',
    payNow: 'Pay Now',
    orderHistory: 'Order History',
    feedback: 'Feedback',
    submit: 'Submit',
    thank_you: 'Thank you for your feedback',
    categories: 'Categories',
    starters: 'Starters',
    main_courses: 'Main Courses',
    sides: 'Sides',
    desserts: 'Desserts',
    drinks: 'Drinks',
    search: 'Search',
    empty_cart: 'Your cart is empty',
    empty_orders: 'No orders yet',
    qron_title: 'QRON',
    qron_subtitle: 'QR Code Ordering System',
    admin_login: 'Admin Login',
    login: 'Login',
    logout: 'Logout',
    admin_dashboard: 'Admin Dashboard',
    orders: 'Orders',
    customers: 'Customers',
    settings: 'Settings',
    add_item: 'Add Item',
    edit_item: 'Edit Item',
    delete_item: 'Delete Item',
    save: 'Save',
    cancel: 'Cancel',
    order_status: 'Order Status',
    payment_status: 'Payment Status',
    quantity: 'Quantity',
    allergies: 'Allergies',
    special_instructions: 'Special Instructions',
    table_number: 'Table Number',
    order_time: 'Order Time',
    customer_name: 'Customer Name',
    rate_experience: 'Rate your experience',
    leave_comment: 'Leave a comment',
    proceed_to_checkout: 'Proceed to Checkout'
  },
  [Language.GERMAN]: {
    menu: 'Speisekarte',
    cart: 'Warenkorb',
    order: 'Bestellen',
    checkout: 'Zur Kasse',
    total: 'Gesamt',
    addToCart: 'In den Warenkorb',
    remove: 'Entfernen',
    placeOrder: 'Bestellung aufgeben',
    orderConfirmed: 'Bestellung bestätigt',
    orderDetails: 'Bestelldetails',
    payment: 'Zahlung',
    payNow: 'Jetzt bezahlen',
    orderHistory: 'Bestellverlauf',
    feedback: 'Feedback',
    submit: 'Einreichen',
    thank_you: 'Vielen Dank für Ihr Feedback',
    categories: 'Kategorien',
    starters: 'Vorspeisen',
    main_courses: 'Hauptgerichte',
    sides: 'Beilagen',
    desserts: 'Desserts',
    drinks: 'Getränke',
    search: 'Suchen',
    empty_cart: 'Ihr Warenkorb ist leer',
    empty_orders: 'Noch keine Bestellungen',
    qron_title: 'QRON',
    qron_subtitle: 'QR-Code-Bestellsystem',
    admin_login: 'Admin-Login',
    login: 'Anmelden',
    logout: 'Abmelden',
    admin_dashboard: 'Admin-Dashboard',
    orders: 'Bestellungen',
    customers: 'Kunden',
    settings: 'Einstellungen',
    add_item: 'Artikel hinzufügen',
    edit_item: 'Artikel bearbeiten',
    delete_item: 'Artikel löschen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    order_status: 'Bestellstatus',
    payment_status: 'Zahlungsstatus',
    quantity: 'Menge',
    allergies: 'Allergene',
    special_instructions: 'Besondere Anweisungen',
    table_number: 'Tischnummer',
    order_time: 'Bestellzeit',
    customer_name: 'Kundenname',
    rate_experience: 'Bewerten Sie Ihre Erfahrung',
    leave_comment: 'Kommentar hinterlassen',
    proceed_to_checkout: 'Weiter zur Kasse'
  },
  [Language.TURKISH]: {
    menu: 'Menü',
    cart: 'Sepet',
    order: 'Sipariş',
    checkout: 'Ödeme',
    total: 'Toplam',
    addToCart: 'Sepete Ekle',
    remove: 'Kaldır',
    placeOrder: 'Sipariş Ver',
    orderConfirmed: 'Sipariş Onaylandı',
    orderDetails: 'Sipariş Detayları',
    payment: 'Ödeme',
    payNow: 'Şimdi Öde',
    orderHistory: 'Sipariş Geçmişi',
    feedback: 'Geribildirim',
    submit: 'Gönder',
    thank_you: 'Geribildiriminiz için teşekkürler',
    categories: 'Kategoriler',
    starters: 'Başlangıçlar',
    main_courses: 'Ana Yemekler',
    sides: 'Yan Lezzetler',
    desserts: 'Tatlılar',
    drinks: 'İçecekler',
    search: 'Ara',
    empty_cart: 'Sepetiniz boş',
    empty_orders: 'Henüz sipariş yok',
    qron_title: 'QRON',
    qron_subtitle: 'QR Kod Sipariş Sistemi',
    admin_login: 'Yönetici Girişi',
    login: 'Giriş',
    logout: 'Çıkış',
    admin_dashboard: 'Yönetici Paneli',
    orders: 'Siparişler',
    customers: 'Müşteriler',
    settings: 'Ayarlar',
    add_item: 'Ürün Ekle',
    edit_item: 'Ürün Düzenle',
    delete_item: 'Ürün Sil',
    save: 'Kaydet',
    cancel: 'İptal',
    order_status: 'Sipariş Durumu',
    payment_status: 'Ödeme Durumu',
    quantity: 'Miktar',
    allergies: 'Alerjiler',
    special_instructions: 'Özel Talimatlar',
    table_number: 'Masa Numarası',
    order_time: 'Sipariş Zamanı',
    customer_name: 'Müşteri Adı',
    rate_experience: 'Deneyiminizi değerlendirin',
    leave_comment: 'Yorum bırakın',
    proceed_to_checkout: 'Ödemeye Geç'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);

  useEffect(() => {
    // Check if browser language is supported
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'de') {
      setLanguage(Language.GERMAN);
    } else if (browserLang === 'tr') {
      setLanguage(Language.TURKISH);
    }
    // Otherwise default to English
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
