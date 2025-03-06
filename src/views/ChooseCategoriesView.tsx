import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonText, IonFooter, IonIcon, IonHeader } from '@ionic/react';
import React, { useState } from 'react';
import { CategoriesEnum, StepsEnum } from '../utils/shareEnums';
import { CategoryButton } from '../components/CategoryButton/CategoryButton';
import { Button } from '../components/Button/Button';
import "../styles/footer.css"; 
import "../styles/chooseCategories.css"; 
import { trophySharp, musicalNoteSharp, peopleSharp, keypadSharp, imageSharp, headsetSharp, brushSharp, bookSharp, colorPaletteSharp} from "ionicons/icons"; 
import { AppHeader } from '../components/AppHeader/AppHeader';
import { useTranslation } from 'react-i18next';

interface ChooseCategoryProps {
  step?: StepsEnum;
  setStep?: (step: StepsEnum) => void;
  category?: CategoriesEnum | null;
  setCategory?: (category: CategoriesEnum) => void;
  categoryId: number | null;
  setCategoryId: (categoryId: number) => void;
}

export function ChooseCategoriesView ({
  step,
  setStep,
  category,
  setCategory,
  categoryId,
  setCategoryId,
} : ChooseCategoryProps) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<CategoriesEnum | null>(category ?? null);

  const handlePress = (category: CategoriesEnum, categoryId: number) => {
    setSelectedId(category);
    if (setCategory) {
      setCategory(category);
      setCategoryId(categoryId);
    }
  };

  const categories = [
    { id: '1', label: t('categories.culture'), icon: colorPaletteSharp }, 
    { id: '2', label: t('categories.education'), icon: bookSharp }, 
    { id: '3', label: t('categories.parties'), icon: headsetSharp },
    { id: '4', label: t('categories.concerts'), icon: musicalNoteSharp }, 
    { id: '5', label: t('categories.festivals'), icon: keypadSharp }, 
    { id: '6', label: t('categories.sports'), icon: trophySharp }, 
    { id: '7', label: t('categories.theater'), icon: brushSharp},
    { id: '8', label: t('categories.exhibitions'), icon: imageSharp }, 
    { id: '9', label: t('categories.clubs'), icon: peopleSharp }, 
  ];
  

  function handleNext() {
    if (setStep) {
      setStep(StepsEnum.DEFAULT);
    }
  }

  return (
    <IonPage>
      <IonHeader className="header">
        <AppHeader title={t('addEvent.category')} goBack={handleNext}/> 
      </IonHeader>
      <div className='categories-wrap'>        
        <IonRow>
          {categories.map((category) => (
            <IonCol size="4" key={category.id}>
              <CategoryButton
                key={category.id}
                label={category.label}
                icon={category.icon}
                onPress={() => handlePress(category.label as CategoriesEnum, parseInt(category.id))}
                selected={selectedId === category.label}
              />                  
            </IonCol>
          ))}
        </IonRow>
      </div>
      
      <IonFooter className='footer'>
        <Button 
          label={t('addEvent.next')}
          onClick={handleNext}
        />
      </IonFooter>
    </IonPage>
  );
};

