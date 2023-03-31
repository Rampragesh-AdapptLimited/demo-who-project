import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

const Language = () => {
  const {t} = useTranslation();
  return (
    <View>
      <Text>{t('localization_testing')}</Text>
    </View>
  );
};

export default Language;
