import React, { useState } from "react";
import { Header, Footer, Button, Card, Alert, BUTTON_VARIANTS, BUTTON_SIZES, ALERT_TYPES } from "./components";
import "./App.css";

function App() {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (type, message) => {
    const newAlert = {
      id: Date.now(),
      type,
      message,
    };
    setAlerts((prev) => [...prev, newAlert]);
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const navItems = [
    { text: "Home", link: "#" },
    { text: "Components", link: "#components" },
    { text: "Documentation", link: "#docs" },
  ];

  const footerLinks = [
    {
      title: "Components",
      items: [
        { text: "Layout", link: "#layout" },
        { text: "UI", link: "#ui" },
        { text: "Forms", link: "#forms" },
      ],
    },
    {
      title: "Resources",
      items: [
        { text: "Documentation", link: "#docs" },
        { text: "Examples", link: "#examples" },
        { text: "GitHub", link: "#github" },
      ],
    },
  ];

  return (
    <div className="app">
      <Header title="React Components Library" navItems={navItems} />

      <main className="main-content">
        <section className="section">
          <h2>Buttons</h2>
          <div className="demo-container">
            {Object.values(BUTTON_VARIANTS).map((variant) => (
              <Button key={variant} variant={variant} onClick={() => addAlert("info", `Clicked ${variant} button`)}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </div>

          <div className="demo-container">
            {Object.values(BUTTON_SIZES).map((size) => (
              <Button key={size} size={size} variant="primary">
                {size.charAt(0).toUpperCase() + size.slice(1)} Button
              </Button>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Cards</h2>
          <div className="cards-grid">
            <Card title="Basic Card" subtitle="Card Subtitle" hoverable>
              This is a basic card with title and content.
            </Card>

            <Card title="Card with Image" image="https://via.placeholder.com/300x200" imageAlt="Placeholder">
              Card with an image at the top.
            </Card>

            <Card
              title="Card with Actions"
              actions={
                <div className="card-buttons">
                  <Button variant="primary" size="small">
                    Accept
                  </Button>
                  <Button variant="danger" size="small">
                    Decline
                  </Button>
                </div>
              }>
              Card with action buttons.
            </Card>
          </div>
        </section>

        <section className="section">
          <h2>Alerts</h2>
          <div className="alerts-demo">
            {Object.values(ALERT_TYPES).map((type) => (
              <Alert
                key={type}
                type={type}
                title={`${type.charAt(0).toUpperCase() + type.slice(1)} Alert`}
                message={`This is a ${type} alert message.`}
                dismissible
                onClose={() => console.log(`${type} alert closed`)}
              />
            ))}
          </div>
        </section>

        <div className="alerts-container">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              type={alert.type}
              message={alert.message}
              dismissible
              autoClose
              onClose={() => removeAlert(alert.id)}
            />
          ))}
        </div>
      </main>

      <Footer
        copyright="© 2024 React Components Library"
        links={footerLinks}
        socialLinks={[
          { name: "GitHub", link: "#", icon: "🔗" },
          { name: "Twitter", link: "#", icon: "🔗" },
        ]}
      />
    </div>
  );
}

export default App;
