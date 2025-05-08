
import React, { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const EducationalContent = lazy(() => import("@/components/EducationalContent"));

interface LearnTabContentProps {
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

const LearnTabContent: React.FC<LearnTabContentProps> = ({ isActive }) => {
  return (
    <Suspense fallback={<ContentSkeleton />}>
      {isActive && <EducationalContent />}
    </Suspense>
  );
};

export default LearnTabContent;
