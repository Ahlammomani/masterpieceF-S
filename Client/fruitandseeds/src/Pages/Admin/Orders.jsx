import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Input, Tag, Space, Card, Divider, Badge } from 'antd';
import { SearchOutlined, FilterOutlined, SyncOutlined, EyeOutlined } from '@ant-design/icons';
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

  const paymentColors = {
    card: '#99BC85',
    cash: '#97BE5A',
    paypal: '#003087',
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
      setOrders(response.data.orders || []); // Ensure orders is always an array
      setPagination({
        ...pagination,
        total: response.data.total,
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]); // Set to empty array on error
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
      render: (id) => <span className="font-semibold">#{id}</span>,
      width: 120,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <div className="text-sm">
          <div>{new Date(date).toLocaleDateString()}</div>
          <div className="text-gray-500">{new Date(date).toLocaleTimeString()}</div>
        </div>
      ),
      width: 150,
    },
    {
      title: 'Items',
      dataIndex: 'orderItems',
      key: 'items',
      render: (items) => (
        <Badge 
          count={items?.length || 0} // Add null check for items
          style={{ backgroundColor: '#FF8BA7' }}
          className="font-semibold"
        />
      ),
      width: 100,
    },
   {
  title: 'Total',
  dataIndex: 'totalPrice',
  key: 'total',
  render: (price) => <span className="font-semibold">${(Number(price) || 0).toFixed(2)}</span>,
  width: 120,
},
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag 
          color={statusColors[status] || '#d9d9d9'}
          style={{
            padding: '0 8px',
            borderRadius: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            fontSize: '12px',
          }}
        >
          {status}
        </Tag>
      ),
      width: 150,
    },
    {
      title: 'Payment',
      dataIndex: 'paymentMethod',
      key: 'payment',
      render: (method) => (
        <Tag 
          color={paymentColors[method?.toLowerCase()] || '#d9d9d9'} // Add null check for method
          style={{
            padding: '0 8px',
            borderRadius: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            fontSize: '12px',
          }}
        >
          {method}
        </Tag>
      ),
      width: 150,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EyeOutlined />}
            className="flex items-center"
            style={{ 
              backgroundColor: '#99BC85', 
              color: '#FDFAF6',
              borderRadius: '6px',
              fontWeight: 500,
            }}
            onClick={() => viewOrderDetails(record)}
          >
            Details
          </Button>
        </Space>
      ),
      width: 120,
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
        render: (_, record) => (
          <div className="flex items-center">
            {record.product?.image && (
              <img 
                src={record.product.image} 
                alt={record.product.name}
                className="w-10 h-10 object-cover rounded mr-3"
              />
            )}
            <span>{record.product?.name || 'N/A'}</span> {/* Add fallback for product name */}
          </div>
        ),
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity) => (
          <Badge 
            count={quantity || 0} // Add null check for quantity
            style={{ backgroundColor: '#97BE5A' }}
            className="font-semibold"
          />
        ),
      },
      {
        title: 'Unit Price',
        dataIndex: 'price',
        key: 'price',
        render: (price) => `$${(price || 0).toFixed(2)}`, // Add null check for price
      },
      {
        title: 'Subtotal',
        key: 'subtotal',
        render: (_, record) => (
          <span className="font-semibold">${((Number(record.price) || 0) * (Number(record.quantity) || 0)).toFixed(2)}</span>// Add null checks
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={order.orderItems || []} // Ensure orderItems is always an array
        pagination={false}
        size="small"
        style={{ backgroundColor: '#FDFAF6' }}
        rowKey={(record) => record.product?.id || record.id}
      />
    );
  };

  return (
    <div className="p-6 bg-[#FDFAF6] min-h-screen">
      <Card
        title={
          <div className="flex items-center">
            <span className="text-xl font-semibold">Orders Management</span>
            <span className="ml-2 text-sm text-gray-500">
              {pagination.total || 0} total orders {/* Add fallback for total */}
            </span>
          </div>
        }
        className="shadow-sm"
        styles={{
          header: {
            backgroundColor: '#99BC85',
            color: '#FDFAF6',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            padding: '16px 24px',
          },
          body: {
            padding: '24px',
          },
        }}
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            placeholder="Search orders..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="max-w-md"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          
          <div className="flex gap-4">
            <Select
              placeholder="Filter by status"
              className="min-w-[180px]"
              suffixIcon={<FilterOutlined className="text-gray-400" />}
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
              icon={<SyncOutlined />}
              style={{ 
                backgroundColor: '#97BE5A', 
                color: '#FDFAF6',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onClick={fetchOrders}
            >
              Refresh
            </Button>
          </div>
        </div>

        <Divider style={{ backgroundColor: '#FF8BA7', margin: '0 0 16px 0' }} />

        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          expandable={{ 
            expandedRowRender,
            expandIconColumnIndex: -1,
            expandRowByClick: true,
          }}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize });
            },
            style: { margin: '16px 0 0 0' },
          }}
          scroll={{ x: 'max-content' }}
          className="custom-antd-table"
        />
      </Card>

      <style jsx="true" global="true">{` // Fix boolean attributes by using strings
        .custom-antd-table .ant-table-thead > tr > th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #495057;
        }
        .custom-antd-table .ant-table-tbody > tr:hover > td {
          background-color: #f8f9fa !important;
        }
        .custom-antd-table .ant-table-expanded-row > td {
          background-color: #FDFAF6 !important;
          padding: 16px !important;
        }
      `}</style>
    </div>
  );
};

export default Orders;