import React from 'react';
import { 
  Wrench, 
  Sparkles, 
  Droplets, 
  Truck, 
  Zap, 
  Trees, 
  Scissors, 
  Cpu, 
  GraduationCap 
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { ServiceCategory } from '../types';

interface CategorySectionProps {
  selectedCategory: ServiceCategory | 'all';
  onSelectCategory: (category: ServiceCategory | 'all') => void;
  onSelectTaskKeyword: (keyword: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectTaskKeyword,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Trees': return <Trees className="w-5 h-5" />;
      case 'Scissors': return <Scissors className="w-5 h-5" />;
      case 'Refrigerator': return <Cpu className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      default: return <Wrench className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-8 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Explore Popular Services
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Select a category to view vetted providers in your area
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 border ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
            >
              All Categories
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between h-36 group ${
                  isSelected
                    ? 'bg-white border-emerald-600 ring-2 ring-emerald-600/20 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-100 text-stone-700 group-hover:bg-emerald-50 group-hover:text-emerald-700'
                    }`}
                  >
                    {getIcon(cat.icon)}
                  </div>
                  <span className="text-[11px] font-bold text-stone-500 tabular-nums">
                    From R{cat.startingPrice}/hr
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-sm font-bold tracking-tight line-clamp-1 transition-colors ${
                      isSelected ? 'text-emerald-800' : 'text-stone-900 group-hover:text-emerald-700'
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {cat.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
