import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { categoriesStore, productsStore } from '@/lib/store';
import { useStore } from '@nanostores/react';
import { useState } from 'react';

import type { Product } from './Products';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

export default function FilterSidebar() {
  const products: Product[] = useStore(productsStore);
  const categories: string[] = useStore(categoriesStore);
  const [selectedCatetories, setSelectedCatetories] = useState<Array<string>>(
    [],
  );
  const [max, setMax] = useState(3500);

  function addToSelection(category: string) {
    setSelectedCatetories((prev) => [...prev, category]);
  }

  function removeFromSelection(category: string) {
    setSelectedCatetories((prev) => prev.filter((cat) => cat !== category));
  }

  function handleFilter() {
    const filteredCategories = products.filter((product) => {
      return (
        selectedCatetories.includes(product.category) && product.price < max
      );
    });
    productsStore.set(filteredCategories);
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" className="dark:text-gray-900">
          Filter products
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-4">
        <SheetHeader>
          <SheetTitle>Filter your options</SheetTitle>
          <SheetDescription className="gap-4">
            <div>
              <p className="text-xl font-bold">Categories</p>
              <div className="flex flex-col pt-4 gap-2">
                {categories.map((category) => {
                  return (
                    <div className="flex items-center space-x-2" key={category}>
                      <input
                        className="h-4 w-4 shrink-0 rounded-sm border border-slate-200 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900"
                        id={category}
                        onClick={(e) =>
                          e.currentTarget.checked
                            ? addToSelection(category)
                            : removeFromSelection(category)
                        }
                        type="checkbox"
                      />
                      <label
                        htmlFor={category}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-4">
              <p className="text-xl font-bold">Price</p>
              <div className="flex flex-col pt-4 gap-2">
                <Slider
                  defaultValue={[2000]}
                  onValueChange={([val]) => setMax(val)}
                  max={2000}
                  step={1}
                />
                <p>{max} $</p>
              </div>
            </div>
            <SheetClose>
              <Button className="mt-4" size="lg" onClick={handleFilter}>
                Apply filters
              </Button>
            </SheetClose>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
