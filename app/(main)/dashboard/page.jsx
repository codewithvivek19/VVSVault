import { Suspense } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Sparkles } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="relative min-h-screen -mt-16 pt-16">
      {/* Main background with animated gradient overlay */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/90"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
          {/* Purple orb */}
          <div className="absolute top-[10%] right-[20%] w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,#7c3aed_0%,transparent_70%)] blur-[60px] animate-pulse-slow"></div>
          
          {/* Blue orb */}
          <div className="absolute bottom-[15%] left-[25%] w-[45vw] h-[45vw] bg-[radial-gradient(circle_at_center,#2563eb_0%,transparent_70%)] blur-[70px] animate-pulse-slower"></div>
          
          {/* Cyan accent */}
          <div className="absolute top-[60%] right-[30%] w-[25vw] h-[25vw] bg-[radial-gradient(circle_at_center,#0891b2_0%,transparent_70%)] blur-[50px] animate-float"></div>
        </div>
        
        {/* Detailed geometric elements */}
        <div className="absolute inset-0 opacity-[0.15]">
          {/* Hexagonal pattern */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke-width='1' stroke='%23ffffff' opacity='0.2' /%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
          
          {/* Diagonal lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Generate random sparkles using pseudo-elements */}
          <div className="absolute h-2 w-2 rounded-full bg-blue-400/40 top-[15%] left-[10%] animate-float-slow"></div>
          <div className="absolute h-1.5 w-1.5 rounded-full bg-purple-400/40 top-[25%] left-[45%] animate-float-medium"></div>
          <div className="absolute h-2.5 w-2.5 rounded-full bg-indigo-400/40 top-[60%] left-[25%] animate-float-fast"></div>
          <div className="absolute h-2 w-2 rounded-full bg-cyan-400/40 top-[35%] left-[75%] animate-float-slow"></div>
          <div className="absolute h-1.5 w-1.5 rounded-full bg-blue-400/40 top-[75%] left-[85%] animate-float-medium"></div>
          <div className="absolute h-2.5 w-2.5 rounded-full bg-purple-400/40 top-[45%] left-[65%] animate-float-fast"></div>
          <div className="absolute h-3 w-3 rounded-full bg-indigo-400/30 top-[85%] left-[35%] animate-float-slow"></div>
          <div className="absolute h-2 w-2 rounded-full bg-cyan-400/30 top-[18%] left-[28%] animate-float-medium"></div>
          <div className="absolute h-1.5 w-1.5 rounded-full bg-blue-400/30 top-[68%] left-[58%] animate-float-fast"></div>
        </div>
        
        {/* Glass panels floating in space */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute w-[30vw] h-[20vh] bg-white/5 backdrop-blur-md rounded-3xl top-[5%] left-[15%] transform rotate-12 border border-white/10"></div>
          <div className="absolute w-[25vw] h-[25vh] bg-white/5 backdrop-blur-md rounded-3xl bottom-[15%] right-[10%] transform -rotate-6 border border-white/10"></div>
          <div className="absolute w-[15vw] h-[30vh] bg-white/5 backdrop-blur-md rounded-3xl top-[45%] left-[5%] transform -rotate-15 border border-white/10"></div>
        </div>
      </div>
      
      {/* Dashboard content with enhanced container */}
      <div className="relative z-10 space-y-8 container mx-auto px-4">
        {/* Header section with title */}
        <div className="pt-4 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse-slow" />
            <h1 className="text-2xl font-bold text-white">Financial Dashboard</h1>
          </div>
          <p className="text-sm text-muted-foreground max-w-lg">
            Track your finances, manage accounts, and monitor your spending all in one place.
          </p>
        </div>
        
        {/* Budget Progress */}
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />

        {/* Dashboard Overview */}
        <div className="rounded-xl p-0.5 bg-gradient-to-r from-primary/20 via-blue-600/20 to-purple-600/20">
          <div className="bg-background/95 backdrop-blur-md rounded-lg overflow-hidden">
            <DashboardOverview
              accounts={accounts}
              transactions={transactions || []}
            />
          </div>
        </div>

        {/* Section title */}
        <div className="flex items-center gap-2 mt-10 mb-2">
          <h2 className="text-lg font-medium">Your Accounts</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent"></div>
        </div>
        
        {/* Accounts Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-all duration-300 cursor-pointer border-dashed border-primary/20 bg-background/80 backdrop-blur-sm hover:bg-gradient-to-br hover:from-primary/5 hover:to-background/80 hover:scale-[1.02] group">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                <div className="bg-primary/10 rounded-full p-3 mb-2 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm font-medium">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>
          {accounts.length > 0 &&
            accounts?.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      </div>
      
      {/* Subtle vignette overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,0.4)_100%)]"></div>
    </div>
  );
}
