import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { CDBContainer } from "cdbreact";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { IReview } from "../../Interfaces/ProjectInterfaces";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = () => {
    const [ratingCounts, setRatingCounts] = useState<number[]>([0, 0, 0, 0, 0]); // Đếm số lượng từng mức sao
    const [chartData, setChartData] = useState<any>(null); // Dữ liệu cho Pie Chart

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("http://localhost:5000/reviews");
                const reviews: IReview[] = response.data;
                console.log("Check reviews:", reviews);

                const counts = [0, 0, 0, 0, 0];
                reviews.forEach((review) => {
                    if (review.rating >= 1 && review.rating <= 5) {
                        counts[review.rating - 1]++;
                    }
                });

                console.log("Check counts:", counts);
                setRatingCounts([...counts]);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, []);

    useEffect(() => {
        setChartData({
            labels: ["1🌟", "2🌟", "3🌟", "4🌟", "5🌟"],
            datasets: [
                {
                    label: "Rating Distribution",
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(255, 206, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                    ],
                    borderColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 206, 86)",
                        "rgb(75, 192, 192)",
                        "rgb(153, 102, 255)",
                    ],
                    data: ratingCounts,
                },
            ],
        });

        console.log("Updated ratingCounts:", ratingCounts);
    }, [ratingCounts]);

    return (
        <CDBContainer>
            <h2 className="mt-2 text-center">The Number Of Rating</h2>
            {chartData ? (
                <div style={{ width: "100%", height: "500px", margin: "0 auto" }}>
                    <Pie
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                    />
                </div>
            ) : (
                <p className="text-center mt-4">Loading chart data...</p> // Thông báo nếu chưa có dữ liệu
            )}
        </CDBContainer>
    );
};
