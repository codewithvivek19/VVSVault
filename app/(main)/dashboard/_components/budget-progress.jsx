"use client";

import { useState, useEffect, useRef } from "react";
import { Pencil, Check, X, DollarSign, Sparkles, AlertTriangle, Award, TrendingDown, TrendingUp } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";
import { cn } from "@/lib/utils";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );
  const [isHovering, setIsHovering] = useState(false);
  const [animateValue, setAnimateValue] = useState(0);
  const progressRef = useRef(null);

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;
  
  const remaining = initialBudget 
    ? initialBudget.amount - currentExpenses 
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  useEffect(() => {
    // Animate the progress value
    const timer = setTimeout(() => {
      setAnimateValue(percentUsed);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [percentUsed]);

  // Get budget status icon and color
  const getBudgetStatus = () => {
    if (percentUsed >= 90) {
      return {
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        color: "text-red-500",
        className: "bg-red-500/10 border-red-500/20"
      };
    } else if (percentUsed >= 75) {
      return {
        icon: <TrendingUp className="h-5 w-5 text-yellow-500" />,
        color: "text-yellow-500",
        className: "bg-yellow-500/10 border-yellow-500/20"
      };
    } else if (percentUsed >= 50) {
      return {
        icon: <TrendingDown className="h-5 w-5 text-blue-500" />,
        color: "text-blue-500",
        className: "bg-blue-500/10 border-blue-500/20"
      };
    } else {
      return {
        icon: <Award className="h-5 w-5 text-green-500" />,
        color: "text-green-500",
        className: "bg-green-500/10 border-green-500/20"
      };
    }
  };

  // Get budget message based on percentage used
  const getBudgetMessage = () => {
    if (percentUsed >= 90) {
      return "Critical! You're very close to your budget limit.";
    } else if (percentUsed >= 75) {
      return "Caution! You've used most of your budget.";
    } else if (percentUsed >= 50) {
      return "Good progress. Keep managing your expenses.";
    } else if (percentUsed >= 25) {
      return "Excellent! You're being mindful with spending.";
    } else {
      return "Great start! Your budget is looking healthy.";
    }
  };

  // Determine background pattern based on usage
  const getBudgetPattern = () => {
    if (percentUsed >= 90) {
      return "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-200/20 via-transparent to-transparent";
    } else if (percentUsed >= 75) {
      return "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/20 via-transparent to-transparent";
    } else {
      return "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-200/20 via-transparent to-transparent";
    }
  };

  const statusInfo = getBudgetStatus();

  return (
    <Card 
      className={cn(
        "overflow-hidden relative border-2 shadow-lg transition-all duration-300",
        statusInfo.className,
        isHovering ? "shadow-xl scale-[1.02]" : ""
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`absolute inset-0 ${getBudgetPattern()} opacity-80 z-0`}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10 backdrop-blur-sm"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8 backdrop-blur-sm"></div>
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <motion.div 
              initial={{ rotate: 0 }} 
              animate={{ rotate: isHovering ? 15 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>
            <CardTitle className="text-sm font-medium">
              Monthly Budget (Default Account)
            </CardTitle>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <span className="text-muted-foreground">₹</span>
                  </div>
                  <Input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-36 pl-7 border-border bg-background/80 backdrop-blur-sm"
                    placeholder="Enter amount"
                    autoFocus
                    disabled={isLoading}
                  />
                </div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleUpdateBudget}
                    disabled={isLoading}
                    className="bg-background/80 backdrop-blur-sm hover:bg-green-500/20"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="bg-background/80 backdrop-blur-sm hover:bg-red-500/20"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </motion.div>
              </div>
            ) : (
              <>
                <CardDescription className="text-base">
                  {initialBudget
                    ? `₹${currentExpenses.toFixed(2)} of ₹${initialBudget.amount.toFixed(2)} spent`
                    : "No budget set"}
                </CardDescription>
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(true)}
                    className="h-6 w-6 hover:bg-background/60"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        {initialBudget && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  {statusInfo.icon}
                  <span className={`text-xs font-medium ${statusInfo.color}`}>
                    {percentUsed >= 90 ? "Critical" : 
                     percentUsed >= 75 ? "Warning" : 
                     percentUsed >= 50 ? "Good" : "Excellent"}
                  </span>
                </div>
                <motion.p 
                  className="text-xs font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={Math.round(percentUsed)}
                >
                  {percentUsed.toFixed(1)}% used
                </motion.p>
              </div>
              
              <div 
                className="relative h-2.5 bg-background/50 rounded-full overflow-hidden"
                ref={progressRef}
              >
                {/* Pattern overlay in progress bar */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-stripes-sm"></div>
                
                <motion.div
                  className={`absolute h-full rounded-full ${
                    percentUsed >= 90
                      ? "bg-red-500"
                      : percentUsed >= 75
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${animateValue}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">
                  ₹{remaining.toFixed(2)} remaining
                </span>
              </div>
              <motion.div 
                className={`text-xs px-2 py-0.5 rounded-full ${statusInfo.className}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className={`${statusInfo.color} font-medium`}>
                  {remaining > 0 ? "On Track" : "Over Budget"}
                </span>
              </motion.div>
            </div>
            
            <motion.div 
              className="text-xs text-muted-foreground bg-background/40 backdrop-blur-sm p-2 rounded-lg border border-border/50"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="italic">"{getBudgetMessage()}"</p>
            </motion.div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
