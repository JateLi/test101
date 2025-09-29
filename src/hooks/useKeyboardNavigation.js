import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardNavigation = () => {
  const navigate = useNavigate();

  const handleKeyPress = useCallback((event) => {
    // Alt + 数字键快速导航
    if (event.altKey && !event.ctrlKey && !event.metaKey) {
      switch (event.key) {
        case '1':
          event.preventDefault();
          navigate('/');
          break;
        case '2':
          event.preventDefault();
          navigate('/dashboard');
          break;
        case '3':
          event.preventDefault();
          navigate('/games');
          break;
        case '4':
          event.preventDefault();
          navigate('/tools');
          break;
        case '5':
          event.preventDefault();
          navigate('/gallery');
          break;
        case '6':
          event.preventDefault();
          navigate('/about');
          break;
        default:
          break;
      }
    }

    // Ctrl/Cmd + H 返回首页
    if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
      event.preventDefault();
      navigate('/');
    }

    // Ctrl/Cmd + B 返回上一页
    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
      event.preventDefault();
      window.history.back();
    }
  }, [navigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return null;
};