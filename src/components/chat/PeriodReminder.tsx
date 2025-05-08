
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const PeriodReminder: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  // Show the notification after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const reminderText = {
    en: "Your period is expected to start in 3 days. Remember to wash and prepare your reusable pads for your next cycle!",
    am: "የወር አበባዎ በ3 ቀናት ውስጥ እንደሚጀምር ይጠበቃል። ለሚቀጥለው ዑደትዎ እንደገና ሊጠቀሙበት የሚችሉትን ፓዶችዎን ማጠብና ማዘጋጀትዎን አይርሱ!"
  };

  const titleText = {
    en: "Period Reminder",
    am: "የወር አበባ ማስታወሻ"
  };

  const closeText = {
    en: "Got it",
    am: "ገባኝ"
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b border-purple-100">
          <DrawerTitle className="text-purple-700">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-600" />
              {titleText[language === 'en' ? 'en' : 'am']}
            </div>
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 py-6">
          <DrawerDescription className="text-lg font-medium text-gray-700">
            {reminderText[language === 'en' ? 'en' : 'am']}
          </DrawerDescription>
        </div>
        
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              {closeText[language === 'en' ? 'en' : 'am']}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PeriodReminder;
