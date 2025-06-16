import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, PackageIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import ItemList from './ItemList';
import { Order, Item } from '../utils/mockData';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
interface OrderListProps {
  orders: Order[];
  items: Item[];
}
const OrderList: React.FC<OrderListProps> = ({
  orders,
  items
}) => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const toggleOrderExpand = (orderId: string) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter(id => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };
  const getOrderItems = (orderId: string) => {
    return items.filter(item => item.orderId === orderId);
  };
  if (orders.length === 0) {
    return <div className="p-4 text-center text-gray-500">
        Nessun ordine nel periodo selezionato.
      </div>;
  }
  return <div className="mb-4">
      <div className="grid grid-cols-12 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 rounded-t-md">
        <div className="col-span-1"></div>
        <div className="col-span-2">Data</div>
        <div className="col-span-2">Numero</div>
        <div className="col-span-3">Stato</div>
        <div className="col-span-4 text-right">Importo (€)</div>
      </div>
      {orders.map(order => {
      const isExpanded = expandedOrders.includes(order.id);
      const orderItems = getOrderItems(order.id);
      return <div key={order.id} className="border-b border-gray-200 last:border-0">
            <div className={`grid grid-cols-12 px-4 py-3 hover:bg-gray-100 cursor-pointer ${isExpanded ? 'bg-blue-50' : ''}`} onClick={() => toggleOrderExpand(order.id)}>
              <div className="col-span-1 flex items-center">
                {isExpanded ? <ChevronUpIcon size={18} className="text-blue-500" /> : <ChevronDownIcon size={18} className="text-gray-400" />}
              </div>
              <div className="col-span-2">
                {format(new Date(order.date), 'dd/MM/yyyy', {
              locale: it
            })}
              </div>
              <div className="col-span-2">{order.number}</div>
              <div className="col-span-3">
                <div className="flex flex-wrap gap-2">
                  {order.dropShipping && <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                      <PackageIcon size={14} className="mr-1" />
                      Drop Shipping
                    </span>}
                  {order.dropShipping && (order.status === 'Da confermare' ? <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        <AlertCircleIcon size={14} className="mr-1" />
                        Da confermare
                      </span> : <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        <CheckCircleIcon size={14} className="mr-1" />
                        Ordinato IR
                      </span>)}
                </div>
              </div>
              <div className="col-span-4 text-right font-medium">
                {order.amount.toLocaleString('it-IT', {
              minimumFractionDigits: 2
            })}{' '}
                €
              </div>
            </div>
            {isExpanded && <div className="bg-gray-50 pl-8 pr-4 py-2">
                <ItemList items={orderItems} />
              </div>}
          </div>;
    })}
    </div>;
};
export default OrderList;