import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Input, Tag, Space, Card, Divider } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const statusColors = {
    pending: '#FF8BA7',
    processing: '#97BE5A',
    completed: '#99BC85',
    cancelled: '#ff4d4f',
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/orders', {
        params: {
          search: searchText,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          page: pagination.current,
          pageSize: pagination.pageSize,
        },
      });
      setOrders(response.data.orders);
      setPagination({
        ...pagination,
        total: response.data.total,
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchText, statusFilter, pagination.current]);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => `#${id}`,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Items',
      dataIndex: 'orderItems',
      key: 'items',
      render: (items) => items.length,
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      key: 'total',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status] || '#d9d9d9'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'paymentMethod',
      key: 'payment',
      render: (method) => (
        <Tag color={method === 'card' ? '#99BC85' : '#97BE5A'}>
          {method.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            style={{ backgroundColor: '#99BC85', color: '#FDFAF6' }}
            onClick={() => viewOrderDetails(record)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  const viewOrderDetails = (order) => {
    // Implement order details modal or navigation
    console.log('View order:', order);
  };

  const expandedRowRender = (order) => {
    const columns = [
      {
        title: 'Product',
        dataIndex: ['product', 'name'],
        key: 'product',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price) => `$${price.toFixed(2)}`,
      },
      {
        title: 'Subtotal',
        key: 'subtotal',
        render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={order.orderItems}
        pagination={false}
        size="small"
        style={{ backgroundColor: '#FDFAF6' }}
      />
    );
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#FDFAF6', minHeight: '100vh' }}>
      <Card
        title="Orders Management"
        style={{
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: 'none',
        }}
        headStyle={{
          backgroundColor: '#99BC85',
          color: '#FDFAF6',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <Input
            placeholder="Search orders..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Filter by status"
            style={{ width: 200 }}
            suffixIcon={<FilterOutlined />}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
          >
            <Option value="all">All Statuses</Option>
            <Option value="pending">Pending</Option>
            <Option value="processing">Processing</Option>
            <Option value="completed">Completed</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
          <Button
            style={{ backgroundColor: '#97BE5A', color: '#FDFAF6' }}
            onClick={fetchOrders}
          >
            Refresh
          </Button>
        </div>

        <Divider style={{ backgroundColor: '#FF8BA7', margin: '10px 0' }} />

        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          expandable={{ expandedRowRender }}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize });
            },
          }}
          style={{ borderRadius: '8px', overflow: 'hidden' }}
        />
      </Card>
    </div>
  );
};

export default Orders;