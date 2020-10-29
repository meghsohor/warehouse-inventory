import React, { useState, useEffect } from 'react';
import { getCurrentLanguage, setCurrentLanguage } from '../../services/dataService';
import { Button, ButtonGroup } from '../../material.components';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState<string>('');

    /**
    * Switch the language.
    * @remarks
    * Set the current language in local state
    * Set the current language in server
    * Set the document's language attr value to current language
    *
    * @returns Void
    */
    const switchLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setCurrentLang(language);
        setCurrentLanguage(language);
        window.document.documentElement.lang = language;
    }

    useEffect(() => {
        getCurrentLanguage().then((language:any) => {
            setCurrentLang(language);
            switchLanguage(language);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ButtonGroup size="small" color="secondary" className="language-switcher">
            <Button variant={currentLang === 'en' ? "contained" : "outlined"} onClick={(e) => switchLanguage('en')}>EN</Button>
            <Button variant={currentLang === 'lt-LT' ? "contained" : "outlined"} onClick={(e) => switchLanguage('lt-LT')}>LT</Button>
        </ButtonGroup>
    )
}

export default LanguageSelector
