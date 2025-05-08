
import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";

interface TipsButtonProps {
  className?: string;
}

const TipsButton: React.FC<TipsButtonProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();

  const insights = {
    en: [
      "Based on your last period, you might feel fatigued soon—try resting!",
      "Your cycle data shows you often experience headaches two days before your period. Consider having pain relief ready.",
      "Remember to stay hydrated during your period to help with bloating."
    ],
    am: [
      "ካለፈው የወር አበባዎ መሰረት፣ በቅርቡ ድካም ሊሰማዎት ይችላል - ዕረፍት ይሞክሩ!",
      "የወር አበባዎ ከመምጣቱ ሁለት ቀናት በፊት ብዙ ጊዜ ራስ ምታት እንደሚያጋጥምዎ የእርስዎ ውሂብ ያሳያል። የህመም ማስታገሻ ዝግጁ ያድርጉ።",
      "የሆድ ማበጣ እንዳይኖር ለመርዳት በወር አበባ ጊዜ ብዙ ውሃ መጠጣትዎን ያስታውሱ።"
    ]
  };

  // Select a random insight
  const getRandomInsight = () => {
    const currentInsights = language === 'en' ? insights.en : insights.am;
    const randomIndex = Math.floor(Math.random() * currentInsights.length);
    return currentInsights[randomIndex];
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        variant="outline" 
        size="sm" 
        className={`flex items-center gap-2 bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200 ${className}`}
      >
        <Lightbulb className="h-4 w-4" />
        {language === 'en' ? 'Insights' : 'ምክሮች'}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-gradient-to-br from-purple-50 to-white border-purple-100">
          <DialogHeader>
            <DialogTitle className="text-purple-700">
              {language === 'en' ? 'Lilly\'s Insights' : 'የሊሊ ምክሮች'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-4 rounded-lg bg-white border border-purple-100 shadow-sm">
            <p className="text-gray-700">{getRandomInsight()}</p>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={() => setIsOpen(false)}
              variant="outline" 
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              {language === 'en' ? 'Close' : 'ዝጋ'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TipsButton;
