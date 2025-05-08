
import React, { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Auth = lazy(() => import("@/components/Auth"));

const ContentSkeleton = () => (
  <div className="space-y-4 py-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-24 w-full" />
  </div>
);

const AuthTabContent: React.FC = () => {
  return (
    <Suspense fallback={<ContentSkeleton />}>
      <Auth />
    </Suspense>
  );
};

export default AuthTabContent;
