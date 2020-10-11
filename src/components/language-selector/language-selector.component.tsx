import React, { useState } from 'react';
import { Button, ButtonGroup } from '../../material.components';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState('en');

    const switchLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setCurrentLang(language);
        window.document.documentElement.lang = language;
    }

    return (
        <ButtonGroup size="small" color="secondary" className="language-switcher">
            <Button variant={currentLang === 'en' ? "contained" : "outlined"} onClick={(e) => switchLanguage('en')}>EN</Button>
            <Button variant={currentLang === 'lt-LT' ? "contained" : "outlined"} onClick={(e) => switchLanguage('lt-LT')}>LT</Button>
        </ButtonGroup>
    )
}

export default LanguageSelector
