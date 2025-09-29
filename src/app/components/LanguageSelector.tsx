import React from 'react';

interface LanguageSelectorProps {
    language: string;
    onLanguageChange: (lang: string) => void;
    t: { language: string };
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onLanguageChange, t, }) => {
    const dropdownStyle = {
        padding: '8px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: 'rgba(99, 102, 241, 0.5)', // Match app background color
        color: '#ffffff',
    };return (
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
            <label htmlFor="language" style={{ color: '#ffffff', marginRight: '8px' }}>
                {t.language}
            </label>
            <select
                id="language"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                style={{
                    ...dropdownStyle,
                }}
            >
                <option value="en">English</option>
                <option value="es">Español</option>
            </select>
        </div>
    );
};

export default LanguageSelector;