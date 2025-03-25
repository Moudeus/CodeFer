import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { AdminAPI } from "../../api";
import { toast } from "react-toastify";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await AdminAPI.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const getUserStatsData = () => {
    if (!stats) return null;

    const roleData = stats.users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    const statusData = stats.users.reduce((acc, user) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    }, {});

    return {
      roles: {
        labels: Object.keys(roleData),
        datasets: [
          {
            data: Object.values(roleData),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      status: {
        labels: Object.keys(statusData),
        datasets: [
          {
            data: Object.values(statusData),
            backgroundColor: ["#4CAF50", "#FF5722"],
          },
        ],
      },
    };
  };

  const getSalesData = () => {
    if (!stats) return null;

    const monthlyData = stats.payments.reduce((acc, payment) => {
      const month = new Date(payment.date).toLocaleString("default", { month: "short" });
      acc[month] = (acc[month] || 0) + payment.total;
      return acc;
    }, {});

    return {
      labels: Object.keys(monthlyData),
      datasets: [
        {
          label: "Monthly Sales",
          data: Object.values(monthlyData),
          backgroundColor: "#36A2EB",
        },
      ],
    };
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  const userStats = getUserStatsData();
  const salesData = getSalesData();

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <h3>{stats.users.length}</h3>
              <Card.Text>Total Users</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <h3>{stats.products.length}</h3>
              <Card.Text>Total Products</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <h3>{stats.payments.length}</h3>
              <Card.Text>Total Orders</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <h3>${stats.payments.reduce((sum, p) => sum + p.total, 0).toLocaleString()}</h3>
              <Card.Text>Total Revenue</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Monthly Sales</Card.Title>
              <div style={{ height: "300px" }}>
                <Bar
                  data={salesData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>User Roles</Card.Title>
              <Pie data={userStats.roles} />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>User Status</Card.Title>
              <Pie data={userStats.status} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Card.Title>Recent Orders</Card.Title>
          <Table responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {stats.payments.slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{stats.users.find((u) => u.id === order.userId)?.username || "Unknown"}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>${order.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;
