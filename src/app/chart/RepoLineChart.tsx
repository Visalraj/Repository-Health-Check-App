"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { manualData } from "@/app/helpers/manualData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

type Props = {
    repo: string;
};

type ApiResponse = {
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
};

export default function RepoLineChart({ repo }: Props) {
    const [apiData, setApiData] = useState<ApiResponse | null>(null);

    useEffect(() => {
        fetch(`/api?repo=${encodeURIComponent(repo)}`)
            .then((res) => res.json())
            .then(setApiData);
    }, [repo]);

    if (!apiData) return <p>Loading...</p>;


    const repoMap: Record<string, string> = {
        "facebook/react": "React",
        "twbs/bootstrap": "Bootstrap",
        "pallets/flask": "Flask",
        "iamkun/dayjs": "Day.js",
        "microsoft/vscode": "VS Code",
        "jquery/jquery": "jQuery",
    };

    const repoName = repoMap[repo];

    const labels = [
        "Code Quality",
        "Documentation",
        "Commit Activity",
        "Issue Management",
        "Pull Requests",
        "Testing",
        "Contributors",
        "Maintainability",
    ];

    const apiScores = [
        apiData.scores.codeQuality,
        apiData.scores.documentation,
        apiData.scores.commitActivity,
        apiData.scores.issueManagement,
        apiData.scores.pullRequests,
        apiData.scores.testing,
        apiData.scores.contributors,
        apiData.scores.maintainability,
    ];

    const manualScores = manualData[repo] || [0, 0, 0, 0, 0, 0, 0, 0];

    const data = {
        labels,
        datasets: [
            {
                label: "Manual Evaluation",
                data: manualScores,
                borderColor: "red",
                tension: 0.4,
            },
            {
                label: "API Evaluation",
                data: apiScores,
                borderColor: "green",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `${repoName} - Manual vs API Comparison`,
            },
        },
        scales: {
            y: {
                min: 0,
                max: 12,
            },
        },
    };  

    return <Line data={data} options={options} />;
}
