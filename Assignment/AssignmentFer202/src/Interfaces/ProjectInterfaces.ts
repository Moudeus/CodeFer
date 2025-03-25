
export interface IProduct {
  id: string; // ID sản phẩm là string
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  reviews?: string[]; // Lưu danh sách ID đánh giá
}

export interface IReview {
  id: number; // Giữ kiểu number cho ID đánh giá
  userId: number;
  productId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface ISessionUser {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface IAccount {
  id: number;
  username: string;
  email: string;
  password?: string; // Cho phép password tùy chọn (không lưu trong frontend)
  role: 'user' | 'admin'; // Kiểu role cố định
  status: string;
}

export interface IPaymentHistory {
  id: number;
  userId: number;
  products: IProduct[];
  total: number;
  date: string;
}

export interface ICartItem {
  productId: string; 
  quantity: number;
}

export interface ICart {
  user: number;
  items: ICartItem[];
  total: number;
  id: string;
}

export interface GoogleUser {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
  sub: string; // Đổi `GLfloat` thành `string` vì ID Google thường là chuỗi
}
