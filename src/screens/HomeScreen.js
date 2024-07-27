import { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts';
import { FaUsers } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { getDashData } from "../Api/DashBoad";
import ToggleSwitch from "../components/modal/Toggle";

export default function HomeScreen() {
    const [userCount, setUserCount] = useState('');
    const [revenue, setRevenue] = useState('');
    const [chartData, setChartData] = useState(null);
    const [chartBar, setChartBar] = useState(null);
    const fetchData = async () => {
        try {
            const response = await getDashData();
            console.log(response,'pppppp');
            if (response.status == 200) {
                console.log('herere .......')
                setUserCount(response.data.count);
                setRevenue(response.data.totalAmount);

                const Cancelled = response.data.order.filter((booking) => booking.status === "Cancelled");
                const Completed = response.data.order.filter((booking) => booking.status === "Completed");
                const Confirmed = response.data.order.filter((booking) => booking.status === "Confirmed");
                const Pending = response.data.order.filter((booking) => booking.status === "Pending");
                setChartData({
                    series: [0, 0], // Example series data for chart
                    options: {
                        chart: {
                            type: 'pie',
                        },
                        labels: ['Online', 'Wallet'],
                        responsive: [
                            {
                                breakpoint: 480,
                                options: {
                                    chart: {
                                        width: 200,
                                    },
                                    legend: {
                                        position: 'bottom',
                                    },
                                },
                            },
                        ],
                    },
                });

                setChartBar({
                    series: [Cancelled.length, Completed.length, Confirmed.length, Pending.length],
                    options: {
                        chart: {
                            type: 'donut',
                        },
                        plotOptions: {
                            pie: {
                                startAngle: -90,
                                endAngle: 270,
                            },
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        fill: {
                            type: 'gradient',
                        },
                        labels: ['Cancelled', 'Completed', 'Confirmed', 'Pending'],
                        responsive: [
                            {
                                breakpoint: 480,
                                options: {
                                    chart: {
                                        width: 200,
                                    },
                                    legend: {
                                        position: 'bottom',
                                    },
                                },
                            },
                        ],
                    },
                });
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    useEffect(() => {
       

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="flex p-2 z-0">
            
            <ToggleSwitch />
        </div>


            <div className="flex justify-center flex-col lg:flex-row lg:gap-5 mt-7 lg:mx-10 mx-2">
                <div className="lg:w-56 h-32 bg-white shadow-xl text-xl font-bold pt-3 pl-3 text-center mb-5 lg:mb-0">
                    <div className="mt-7 flex pl-7 items-center">
                        <FaUsers style={{ fontSize: '3em', color: 'green' }} />
                        <div className="pl-14 text-lg">
                            Total Users
                            <p>{userCount}</p>
                        </div>
                    </div>
                </div>
                <div className="lg:w-56 h-32 bg-white shadow-xl text-xl font-bold pt-3 pl-3 text-center">
                    <div className="mt-7 flex pl-7 items-center">
                        <FaChartBar style={{ fontSize: '3em', color: 'orange' }} />
                        <div className="pl-8 text-lg">
                            Total Revenue
                            <p className="text-2xl text-sky-700">₹{revenue}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:mx-10 mx-2 mt-5 flex justify-center">
                <div className="w-11/12 lg:w-1/2 ">
                    <div className="bg-white shadow-lg rounded-lg">
                        {chartBar && (
                            <ReactApexChart
                                options={chartBar.options}
                                series={chartBar.series}
                                type="donut"
                                width={300}
                                height={300}
                                
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
