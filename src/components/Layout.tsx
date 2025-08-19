import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './ui';
import SkipToContent from './SkipToContent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: '탐색', href: '/', current: location.pathname === '/' },
    { name: '이슈', href: '/issues', current: location.pathname === '/issues' },
    { name: '가이드', href: '/guides', current: location.pathname === '/guides' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SkipToContent />
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 fixed top-0 w-full z-50">
        <div className="container mx-auto h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">OS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">오픈소스 네비게이터</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    item.current
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              로그인
            </Button>
            <Button size="sm">
              시작하기
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <nav className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">OS</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">네비게이터</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <ul className="p-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href} 
                    className={`block py-2 px-3 rounded-lg transition-colors ${
                      item.current
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="p-4 border-t mt-auto space-y-2">
              <Button variant="outline" size="sm" fullWidth>
                로그인
              </Button>
              <Button size="sm" fullWidth>
                시작하기
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main id="main-content" className="pt-16 min-h-screen" tabIndex={-1}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">OS</span>
                </div>
                <span className="text-lg font-bold">오픈소스 네비게이터</span>
              </div>
              <p className="text-gray-400 text-sm">
                초보자도 쉽게 시작할 수 있는 오픈소스 기여 플랫폼
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">탐색</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/issues" className="hover:text-white">이슈 찾기</Link></li>
                <li><Link to="/projects" className="hover:text-white">프로젝트</Link></li>
                <li><Link to="/trending" className="hover:text-white">트렌딩</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">도움말</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/guides" className="hover:text-white">시작 가이드</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-white">문의하기</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">회사</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white">소개</Link></li>
                <li><Link to="/blog" className="hover:text-white">블로그</Link></li>
                <li><Link to="/careers" className="hover:text-white">채용</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 오픈소스 네비게이터. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;