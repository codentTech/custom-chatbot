import { Brain } from "lucide-react";

function FullPageLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Pattern - Same theme as main app */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="text-center relative z-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse shadow-2xl shadow-slate-500/25 border border-slate-600/30">
          <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-['DM_Sans']">
          NeuralFlow
        </h1>

        <div className="w-32 sm:w-40 h-2 sm:h-2.5 bg-slate-800/50 rounded-full overflow-hidden border border-slate-600/30">
          <div className="w-full h-full bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 rounded-full animate-pulse shadow-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default FullPageLoader;
