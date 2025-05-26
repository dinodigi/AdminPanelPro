import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Users, Package, ShoppingCart, Tags, Settings, FileCode } from "lucide-react";

interface Model {
  name: string;
  displayName: string;
  count: number;
}

const modelIcons: Record<string, any> = {
  users: Users,
  products: Package,
  orders: ShoppingCart,
  categories: Tags,
};

export default function Sidebar() {
  const [location, setLocation] = useLocation();

  const { data: models = [] } = useQuery<Model[]>({
    queryKey: ["/api/models"],
  });

  const currentModel = location.split('/')[2] || 'users';

  const handleNavigation = (modelName: string) => {
    setLocation(`/admin/${modelName}`);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Admin Dashboard</h1>
            <p className="text-xs text-slate-500">Schema-Driven CRUD</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-4">
          <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            Models
          </h3>
        </div>

        {models.map((model) => {
          const Icon = modelIcons[model.name] || Package;
          const isActive = currentModel === model.name;

          return (
            <button
              key={model.name}
              onClick={() => handleNavigation(model.name)}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{model.displayName}</span>
              <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
                isActive
                  ? 'bg-primary/20 text-primary'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {model.count}
              </span>
            </button>
          );
        })}

        <div className="border-t border-slate-200 mt-6 pt-4">
          <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            System
          </h3>
          <button 
            onClick={() => setLocation('/settings')}
            className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              location === '/settings'
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors duration-200">
            <FileCode className="w-4 h-4" />
            <span>Schema Editor</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
