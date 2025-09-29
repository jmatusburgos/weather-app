import React from 'react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div 
      data-testid="error-message"
      style={{
        backgroundColor: 'rgba(239, 83, 80, 0.1)',
        color: '#ff6b6b',
        padding: '16px 20px',
        borderRadius: '16px',
        marginBottom: '24px',
        border: '1px solid rgba(239, 83, 80, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        fontSize: '14px'
      }}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          data-testid="close-error"
          style={{
            background: 'none',
            border: 'none',
            color: '#ff6b6b',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '8px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 83, 80, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;