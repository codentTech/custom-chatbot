import { Package } from "lucide-react";

function FullPageLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-pulse">
          <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Chatbot AI
        </h1>
        <div className="w-28 sm:w-36 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default FullPageLoader;
