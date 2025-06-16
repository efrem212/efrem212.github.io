import React from 'react';
import { ShoppingCartIcon, PackageIcon, BoxIcon } from 'lucide-react';
import { Item } from '../utils/mockData';
interface ItemListProps {
  items: Item[];
}
const ItemList: React.FC<ItemListProps> = ({
  items
}) => {
  if (items.length === 0) {
    return <div className="p-4 text-center text-gray-500">
        Nessun articolo presente in questo ordine.
      </div>;
  }
  return <div className="mb-2">
      <div className="grid grid-cols-12 bg-gray-200 px-4 py-2 text-xs font-medium text-gray-700 rounded-t-md">
        <div className="col-span-6">Articolo</div>
        <div className="col-span-3">Stato</div>
        <div className="col-span-3 text-right">Quantità</div>
      </div>
      {items.map(item => <div key={item.id} className="grid grid-cols-12 px-4 py-2 border-b border-gray-200 last:border-0 text-sm">
          <div className="col-span-6">{item.name}</div>
          <div className="col-span-3">
            <div className="flex flex-wrap gap-1">
              {item.status === 'articolo del rivenditore' && <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  <BoxIcon size={12} className="mr-1" />
                  Articolo del rivenditore
                </span>}
              {item.status === 'ordinato a IR' && <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  <PackageIcon size={12} className="mr-1" />
                  Ordinato a IR
                </span>}
              {item.status === 'presente nel carrello' && <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                  <ShoppingCartIcon size={12} className="mr-1" />
                  Nel carrello
                </span>}
            </div>
          </div>
          <div className="col-span-3 text-right">{item.quantity}</div>
        </div>)}
    </div>;
};
export default ItemList;