import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import OrderList from './OrderList';
import { Company, Order, Item } from '../utils/mockData';
import { isWithinInterval } from 'date-fns';
interface CompanyListProps {
  companies: Company[];
  orders: Order[];
  items: Item[];
  dateRange: {
    start: Date;
    end: Date;
  };
}
const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  orders,
  items,
  dateRange
}) => {
  const [expandedCompanies, setExpandedCompanies] = useState<string[]>([]);
  const toggleCompanyExpand = (companyId: string) => {
    if (expandedCompanies.includes(companyId)) {
      setExpandedCompanies(expandedCompanies.filter(id => id !== companyId));
    } else {
      setExpandedCompanies([...expandedCompanies, companyId]);
    }
  };
  const getCompanyOrderStats = (companyId: string) => {
    const filteredOrders = orders.filter(order => order.companyId === companyId && isWithinInterval(new Date(order.date), {
      start: dateRange.start,
      end: dateRange.end
    }));
    const totalOrders = filteredOrders.length;
    const totalAmount = filteredOrders.reduce((sum, order) => sum + order.amount, 0);
    return {
      totalOrders,
      totalAmount,
      filteredOrders
    };
  };
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-100 px-4 py-3 font-medium text-gray-700">
        <div className="col-span-1"></div>
        <div className="col-span-5">Azienda</div>
        <div className="col-span-3 text-right">Numero Ordini</div>
        <div className="col-span-3 text-right">Totale (€)</div>
      </div>
      {companies.length === 0 ? <div className="p-8 text-center text-gray-500">
          Nessuna azienda trovata con i filtri selezionati.
        </div> : companies.map(company => {
      const {
        totalOrders,
        totalAmount,
        filteredOrders
      } = getCompanyOrderStats(company.id);
      const isExpanded = expandedCompanies.includes(company.id);
      return <div key={company.id} className="border-b border-gray-200 last:border-0">
              <div className={`grid grid-cols-12 px-4 py-3 hover:bg-gray-50 cursor-pointer ${isExpanded ? 'bg-blue-50' : ''}`} onClick={() => toggleCompanyExpand(company.id)}>
                <div className="col-span-1 flex items-center">
                  {isExpanded ? <ChevronUpIcon size={20} className="text-blue-500" /> : <ChevronDownIcon size={20} className="text-gray-400" />}
                </div>
                <div className="col-span-5 font-medium">
                  {company.id} - {company.name}
                </div>
                <div className="col-span-3 text-right">{totalOrders}</div>
                <div className="col-span-3 text-right font-medium">
                  {totalAmount.toLocaleString('it-IT', {
              minimumFractionDigits: 2
            })}{' '}
                  €
                </div>
              </div>
              {isExpanded && <div className="bg-gray-50 px-4 py-2">
                  <OrderList orders={filteredOrders} items={items} />
                </div>}
            </div>;
    })}
    </div>;
};
export default CompanyList;