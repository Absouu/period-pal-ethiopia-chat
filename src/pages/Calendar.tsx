
import React from "react";
import CycleCalendar from "@/components/calendar/CycleCalendar";
import { useAuth } from "@/context/AuthContext";

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
          <h1 className="text-2xl font-bold text-primary mb-4">Sign In Required</h1>
          <p className="text-lg text-gray-600 mb-6">
            Please sign in to view and manage your menstrual calendar.
          </p>
          <p className="text-sm text-muted-foreground">
            Your cycle data is private and secure.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Your Cycle Calendar</h1>
          <p className="text-lg text-gray-600">Track, visualize, and predict your menstrual cycles</p>
        </header>
        
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
      </div>
    </div>
  );
};

export default Calendar;
