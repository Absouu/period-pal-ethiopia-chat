
import React from "react";
import CycleCalendar from "@/components/calendar/CycleCalendar";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LilyPadLogo from "@/components/LilyPadLogo";

const Calendar = () => {
  const { authState } = useAuth();
  
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-muted py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authState.user) {
    return (
      <div className="min-h-screen bg-muted py-8 px-4 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <LilyPadLogo className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-4">Sign In Required</h1>
          <p className="text-lg text-gray-600 mb-6">
            Please sign in to view and manage your menstrual calendar.
          </p>
          <p className="text-sm text-muted-foreground">
            Your cycle data is private and secure.
          </p>
          <Link to="/" className="mt-4 inline-block">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center relative">
          <Link to="/" className="absolute left-0 top-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </Link>
          
          <div className="flex items-center justify-center mb-2">
            <LilyPadLogo />
            <h1 className="text-3xl sm:text-4xl font-bold text-primary ml-3">Your Cycle Calendar</h1>
          </div>
          <p className="text-lg text-gray-600">Track, visualize, and predict your menstrual cycles</p>
        </header>
        
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Database Setup Required</AlertTitle>
          <AlertDescription>
            To use the calendar functionality, you need to create a 'cycles' table in your Supabase project. 
            Please check the src/migrations/createCyclesTable.sql file for the required SQL commands.
          </AlertDescription>
        </Alert>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
          <CycleCalendar />
        </div>
        
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <h2 className="text-xl font-semibold mb-4">About Your Cycle Calendar</h2>
          <p className="text-gray-600 mb-4">
            This calendar helps you track your menstrual cycle and predicts future periods based on your previous data. 
            The more regularly you record your cycles, the more accurate the predictions will become.
          </p>
          <p className="text-gray-600">
            To record a new period, simply click on the start date on the calendar and save the details.
          </p>
        </div>
        
        <footer className="text-center text-sm text-gray-500 mt-8 flex flex-col items-center">
          <div className="flex items-center justify-center mb-2">
            <LilyPadLogo size="tiny" className="mr-2" />
            <p>© 2025 Period Pal Ethiopia - In partnership with Lily Pad</p>
          </div>
          <p className="mt-1">Your data is securely stored and protected</p>
        </footer>
      </div>
    </div>
  );
};

export default Calendar;
