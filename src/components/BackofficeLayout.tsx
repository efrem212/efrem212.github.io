import React, { useEffect, useState } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';
import { it } from 'date-fns/locale';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, FilterIcon } from 'lucide-react';
import CompanyList from './CompanyList';
import { generateMockData } from '../utils/mockData';
const BackofficeLayout = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(startOfWeek(currentDate, {
    weekStartsOn: 1
  }));
  const [endDate, setEndDate] = useState(endOfWeek(currentDate, {
    weekStartsOn: 1
  }));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCompanyFilter, setShowCompanyFilter] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [data, setData] = useState(generateMockData());
  // Update date range when current date changes
  useEffect(() => {
    setStartDate(startOfWeek(currentDate, {
      weekStartsOn: 1
    }));
    setEndDate(endOfWeek(currentDate, {
      weekStartsOn: 1
    }));
  }, [currentDate]);
  const handlePreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };
  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setCurrentDate(date);
    setShowDatePicker(false);
  };
  const toggleCompanySelection = (companyId: string) => {
    if (selectedCompanies.includes(companyId)) {
      setSelectedCompanies(selectedCompanies.filter(id => id !== companyId));
    } else {
      setSelectedCompanies([...selectedCompanies, companyId]);
    }
  };
  const filteredCompanies = selectedCompanies.length > 0 ? data.companies.filter(company => selectedCompanies.includes(company.id)) : data.companies;
  return <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">IR Backoffice</h1>
          <div className="text-sm text-gray-500">
            Sistema di gestione ordini
          </div>
        </div>
      </header>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <button onClick={handlePreviousWeek} className="p-2 rounded-md hover:bg-gray-100" aria-label="Settimana precedente">
              <ChevronLeftIcon size={20} />
            </button>
            <div className="relative mx-2">
              <button onClick={() => setShowDatePicker(!showDatePicker)} className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50">
                <CalendarIcon size={16} className="mr-2" />
                <span>
                  {format(startDate, 'dd MMM', {
                  locale: it
                })}{' '}
                  -{' '}
                  {format(endDate, 'dd MMM yyyy', {
                  locale: it
                })}
                </span>
              </button>
              {showDatePicker && <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg p-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Seleziona data
                  </label>
                  <input type="date" onChange={handleDateChange} className="border rounded-md px-2 py-1" value={format(currentDate, 'yyyy-MM-dd')} />
                </div>}
            </div>
            <button onClick={handleNextWeek} className="p-2 rounded-md hover:bg-gray-100" aria-label="Settimana successiva">
              <ChevronRightIcon size={20} />
            </button>
          </div>
          <div className="relative">
            <button onClick={() => setShowCompanyFilter(!showCompanyFilter)} className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50">
              <FilterIcon size={16} className="mr-2" />
              <span>
                Filtra Aziende{' '}
                {selectedCompanies.length > 0 ? `(${selectedCompanies.length})` : ''}
              </span>
            </button>
            {showCompanyFilter && <div className="absolute right-0 z-10 mt-1 bg-white border rounded-md shadow-lg p-4 w-64">
                <h3 className="font-medium mb-2 text-gray-700">
                  Seleziona Aziende
                </h3>
                <div className="max-h-60 overflow-y-auto">
                  {data.companies.map(company => <div key={company.id} className="flex items-center mb-2">
                      <input type="checkbox" id={`company-${company.id}`} checked={selectedCompanies.includes(company.id)} onChange={() => toggleCompanySelection(company.id)} className="mr-2" />
                      <label htmlFor={`company-${company.id}`} className="text-sm">
                        {company.id} - {company.name}
                      </label>
                    </div>)}
                </div>
              </div>}
          </div>
        </div>
      </div>
      <CompanyList companies={filteredCompanies} orders={data.orders} items={data.items} dateRange={{
      start: startDate,
      end: endDate
    }} />
    </div>;
};
export default BackofficeLayout;