import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface IReview {
    id: string; // Đảm bảo kiểu là string để phù hợp với product.reviews
    userId: number;
    rating: number;
    comment: string;
    date: string;
}

interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
    reviews: string[]; // Danh sách chứa các ID đánh giá dạng string
}

export const LineChart = () => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [dataChart, setDataChart] = useState({
        labels: [] as number[],
        datasets: [
            {
                label: 'Average Rating',
                backgroundColor: 'rgba(194, 116, 161, 0.5)',
                borderColor: 'rgb(194, 116, 161)',
                data: [] as number[],
            },
        ],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch dữ liệu đồng thời
                const [reviewsResponse, productsResponse] = await Promise.all([
                    axios.get<IReview[]>('http://localhost:5000/reviews'),
                    axios.get<IProduct[]>('http://localhost:5000/products')
                ]);

                const fetchedReviews = reviewsResponse.data;
                const fetchedProducts = productsResponse.data;

                console.log("Fetched Products:", fetchedProducts);
                console.log("Fetched Reviews:", fetchedReviews);

                const labels = fetchedProducts.map(product => product.id);
                const averageRatings = fetchedProducts.map(product => {
                    const productReviews = fetchedReviews.filter(review =>
                        (product.reviews || []).includes(String(review.id)) // Chuyển `review.id` thành string
                    );

                    console.log(`Product ${product.name} Reviews:`, productReviews);

                    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
                    const averageRating = productReviews.length > 0 ? totalRating / productReviews.length : 0;

                    console.log(`Average Rating for ${product.name}:`, averageRating);
                    return averageRating;
                });

                console.log("Labels (Product IDs):", labels);
                console.log("Average Ratings:", averageRatings);

                setDataChart({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Average Rating',
                            backgroundColor: 'rgba(194, 116, 161, 0.5)',
                            borderColor: 'rgb(194, 116, 161)',
                            data: averageRatings,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <CDBContainer>
            <h2 className="mt-2 text-center">Line Chart</h2>
            <div style={{ width: "100%", height: "500px", margin: "0 auto" }}>
                <Line
                    data={dataChart}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 5,
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                    }}
                />
            </div>
        </CDBContainer>
    );
};
