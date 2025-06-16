import { subDays, format, addDays } from 'date-fns';
export interface Company {
  id: string;
  name: string;
}
export interface Order {
  id: string;
  companyId: string;
  number: string;
  date: string;
  amount: number;
  dropShipping: boolean;
  status: 'Da confermare' | 'Ordinato IR' | null;
}
export interface Item {
  id: string;
  orderId: string;
  name: string;
  quantity: number;
  status: 'articolo del rivenditore' | 'ordinato a IR' | 'presente nel carrello';
}
export interface MockData {
  companies: Company[];
  orders: Order[];
  items: Item[];
}
// Generate a random date within the last 30 days
const randomRecentDate = () => {
  const daysAgo = Math.floor(Math.random() * 30);
  return format(subDays(new Date(), daysAgo), 'yyyy-MM-dd');
};
// Generate a random amount between min and max
const randomAmount = (min: number, max: number) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};
// Generate mock companies
const generateCompanies = (): Company[] => {
  return [{
    id: '60123',
    name: 'Azienda X'
  }, {
    id: '60456',
    name: 'Azienda Y'
  }, {
    id: '70123',
    name: 'Azienda Alfa'
  }, {
    id: '70456',
    name: 'Azienda Beta'
  }];
};
// Generate mock orders
const generateOrders = (companies: Company[]): Order[] => {
  const orders: Order[] = [];
  companies.forEach(company => {
    // Generate between 5 and 15 orders for each company
    const orderCount = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i < orderCount; i++) {
      const dropShipping = Math.random() > 0.5;
      const status = dropShipping ? Math.random() > 0.5 ? 'Da confermare' : 'Ordinato IR' : null;
      orders.push({
        id: `order-${company.id}-${i}`,
        companyId: company.id,
        number: `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        date: randomRecentDate(),
        amount: randomAmount(100, 5000),
        dropShipping,
        status
      });
    }
  });
  return orders;
};
// Generate mock items
const generateItems = (orders: Order[]): Item[] => {
  const items: Item[] = [];
  const productNames = ['Monitor 24" LED', 'Tastiera Wireless', 'Mouse Ergonomico', 'SSD 1TB', 'RAM 16GB DDR4', 'Scheda Video RTX 3060', 'Cuffie Bluetooth', 'Webcam HD', 'Docking Station USB-C', 'Router Wi-Fi 6', 'Stampante Laser', 'UPS 1500VA'];
  orders.forEach(order => {
    // Generate between 1 and 5 items for each order
    const itemCount = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < itemCount; i++) {
      let status: 'articolo del rivenditore' | 'ordinato a IR' | 'presente nel carrello';
      // 30% chance for any item to be 'articolo del rivenditore'
      if (Math.random() < 0.3) {
        status = 'articolo del rivenditore';
      } else if (order.dropShipping && order.status === 'Da confermare') {
        // For dropshipping orders with 'Da confermare' status
        status = 'da confermare';
      } else if (order.dropShipping && order.status === 'Ordinato IR') {
        // For dropshipping orders with 'Ordinato IR' status
        status = 'ordinato a IR';
      } else {
        // For non-dropshipping orders, random status between 'ordinato a IR' and 'presente nel carrello'
        status = Math.random() > 0.5 ? 'ordinato a IR' : 'presente nel carrello';
      }
      items.push({
        id: `item-${order.id}-${i}`,
        orderId: order.id,
        name: productNames[Math.floor(Math.random() * productNames.length)],
        quantity: Math.floor(Math.random() * 5) + 1,
        status
      });
    }
  });
  return items;
};
export const generateMockData = (): MockData => {
  const companies = generateCompanies();
  const orders = generateOrders(companies);
  const items = generateItems(orders);
  return {
    companies,
    orders,
    items
  };
};