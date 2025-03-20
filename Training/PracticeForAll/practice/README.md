# React Components Library

Thư viện React Components tái sử dụng được xây dựng từ các bài tập React.

## Cài đặt

```bash
# Clone repository
git clone [repository-url]

# Cài đặt dependencies
npm install

# Chạy development server
npm start
```

## Components

### Layout Components

#### Header

```jsx
import { Header } from "./components";

<Header
  title="Website Title"
  logo="/path/to/logo.png"
  navItems={[
    { text: "Home", link: "/" },
    { text: "About", link: "/about" },
  ]}
/>;
```

#### Footer

```jsx
import { Footer } from "./components";

<Footer
  copyright="© 2024 Your Company"
  socialLinks={[{ name: "GitHub", link: "#", icon: "🔗" }]}
  links={[
    {
      title: "Company",
      items: [{ text: "About", link: "/about" }],
    },
  ]}
/>;
```

### UI Components

#### Button

```jsx
import { Button, BUTTON_VARIANTS, BUTTON_SIZES } from "./components";

<Button variant={BUTTON_VARIANTS.PRIMARY} size={BUTTON_SIZES.MEDIUM} onClick={() => console.log("Clicked!")}>
  Click Me
</Button>;
```

Variants: primary, secondary, success, danger, warning, info, light, dark, link
Sizes: small, medium, large

#### Card

```jsx
import { Card } from "./components";

<Card
  title="Card Title"
  subtitle="Card Subtitle"
  image="/path/to/image.jpg"
  imagePosition="top"
  hoverable
  bordered
  shadow
  actions={<Button>Action</Button>}>
  Card content goes here
</Card>;
```

#### Alert

```jsx
import { Alert, ALERT_TYPES } from "./components";

<Alert
  type={ALERT_TYPES.SUCCESS}
  title="Success!"
  message="Operation completed successfully"
  dismissible
  autoClose
  autoCloseTime={5000}
  onClose={() => console.log("Alert closed")}
/>;
```

Types: success, error, warning, info

## Props

### Header Props

| Prop     | Type   | Default | Description      |
| -------- | ------ | ------- | ---------------- |
| title    | string | -       | Header title     |
| logo     | string | -       | Logo URL         |
| navItems | array  | -       | Navigation items |

### Footer Props

| Prop        | Type   | Default | Description           |
| ----------- | ------ | ------- | --------------------- |
| copyright   | string | -       | Copyright text        |
| socialLinks | array  | -       | Social media links    |
| links       | array  | -       | Footer links sections |

### Button Props

| Prop      | Type    | Default   | Description       |
| --------- | ------- | --------- | ----------------- |
| variant   | string  | 'primary' | Button variant    |
| size      | string  | 'medium'  | Button size       |
| disabled  | boolean | false     | Disable button    |
| fullWidth | boolean | false     | Full width button |

### Card Props

| Prop          | Type    | Default | Description    |
| ------------- | ------- | ------- | -------------- |
| title         | node    | -       | Card title     |
| subtitle      | node    | -       | Card subtitle  |
| image         | string  | -       | Image URL      |
| imagePosition | string  | 'top'   | Image position |
| hoverable     | boolean | false   | Hover effect   |
| bordered      | boolean | true    | Card border    |
| shadow        | boolean | true    | Card shadow    |

### Alert Props

| Prop          | Type    | Default | Description       |
| ------------- | ------- | ------- | ----------------- |
| type          | string  | 'info'  | Alert type        |
| title         | node    | -       | Alert title       |
| message       | node    | -       | Alert message     |
| dismissible   | boolean | true    | Show close button |
| autoClose     | boolean | false   | Auto close alert  |
| autoCloseTime | number  | 5000    | Auto close delay  |

## Custom Styling

Mỗi component đều có CSS classes riêng có thể override để tùy chỉnh styles:

```css
/* Custom Header styles */
.header {
  /* ... */
}
.header-logo {
  /* ... */
}
.header-nav {
  /* ... */
}

/* Custom Button styles */
.custom-button {
  /* ... */
}
.button-primary {
  /* ... */
}
.button-large {
  /* ... */
}

/* Custom Card styles */
.custom-card {
  /* ... */
}
.card-image {
  /* ... */
}
.card-content {
  /* ... */
}

/* Custom Alert styles */
.custom-alert {
  /* ... */
}
.alert-success {
  /* ... */
}
.alert-dismissible {
  /* ... */
}
```
