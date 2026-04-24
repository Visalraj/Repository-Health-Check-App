"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

type Props = {
    scores: {
        codeQuality: number;
        documentation: number;
        commitActivity: number;
        issueManagement: number;
        pullRequests: number;
        testing: number;
        contributors: number;
        maintainability: number;
    };
    repoName: string;
};

export default function RepoBarChart({ scores, repoName }: Props) {
    const data = {
        labels: [
            "Code Quality",
            "Documentation",
            "Commit Activity",
            "Issue Management",
            "Pull Requests",
            "Testing",
            "Contributors",
            "Maintainability",
        ],
        datasets: [
            {
                label: repoName,
                data: [
                    scores.codeQuality,
                    scores.documentation,
                    scores.commitActivity,
                    scores.issueManagement,
                    scores.pullRequests,
                    scores.testing,
                    scores.contributors,
                    scores.maintainability,
                ],
                //backgroundColor: "rgba(59, 130, 246, 0.6)", // blue bars
                backgroundColor: [
                    "rgba(59, 130, 246, 0.6)",
                    "rgba(34, 197, 94, 0.6)",
                    "rgba(239, 68, 68, 0.6)",
                    "rgba(234, 179, 8, 0.6)",
                    "rgba(168, 85, 247, 0.6)",
                    "rgba(14, 165, 233, 0.6)",
                    "rgba(249, 115, 22, 0.6)",
                    "rgba(236, 72, 153, 0.6)",
                ],

                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `${(repoName).toUpperCase()} - Quantative Review Scores Using Github Api Data`,
            },
        },
        scales: {
            y: {
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
}
