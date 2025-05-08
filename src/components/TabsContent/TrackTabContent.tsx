
import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/LanguageContext";

const CycleDataForm = lazy(() => import("@/components/CycleDataForm"));

interface TrackTabContentProps {
  isActive: boolean;
}

const ContentSkeleton = () => (
  <div className="space-y-4 py-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-24 w-full" />
  </div>
);

const TrackTabContent: React.FC<TrackTabContentProps> = ({ isActive }) => {
  const { t, language } = useLanguage();

  return (
    <Suspense fallback={<ContentSkeleton />}>
      {isActive && (
        <>
          <CycleDataForm />
          
          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/calendar" className="inline-flex items-center">
                <Button className="flex items-center gap-2 w-full">
                  <CalendarIcon className="w-5 h-5" />
                  {t('button.calendar')}
                </Button>
              </Link>
              <Link to="/products" className="inline-flex items-center">
                <Button className="flex items-center gap-2 w-full">
                  <ShoppingBag className="w-5 h-5" />
                  {t('button.products')}
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {language === 'en' 
                ? 'Track your cycle and access quality menstrual products'
                : 'የወር አበባዎን ይከታተሉ እና ጥራት ያላቸው የወር አበባ ምርቶችን ይጠቀሙ'}
            </p>
          </div>
        </>
      )}
    </Suspense>
  );
};

export default TrackTabContent;
