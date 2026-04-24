"use client";
type RepoScores = {
    codeQuality: number;
    documentation: number;
    commitActivity: number;
    issueManagement: number;
    pullRequests: number;
    testing: number;
    contributors: number;
    maintainability: number;
};

type GitHubRepoResponse = {
    repo: string;
    raw: {
        stars: number;
        forks: number;
        openIssues: number;
        issues: number;
        pulls: number;
        contributors: number;
        commits: number;
    };
    scores: RepoScores;
};

import RepoBarChart from "@/app/chart/RepoBarChart";
import { use, useEffect, useState } from "react";

export default function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params); 
    const id = decodeURIComponent(resolvedParams.id).replace(  /\+/g, " ",);

    const [data, setData] = useState<GitHubRepoResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const repoMap: Record<string, string> = {
        React: "facebook/react",
        Bootstrap: "twbs/bootstrap",
        Flask: "pallets/flask",
        "Day.js": "iamkun/dayjs",
        "VS Code": "microsoft/vscode",
        jQuery: "jquery/jquery",
    };

    const repoName = repoMap[id];

    useEffect(() => {
        if (!repoName) {
            setError("Invalid repository");
            return;
        }

        fetch(
            `http://localhost:3000/api/?repo=${encodeURIComponent(repoName)}`,
        )
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then(setData)
            .catch((err) => setError(err.message));
    }, [repoName]);

    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-200 p-8">
                <RepoBarChart
                    scores={data.scores}
                    repoName={data.repo}
                />
            </div>
        </div>
    );
}