import { use } from "react";
import RepoLineChart from "@/app/chart/RepoLineChart";
export default function FinalReviewPage({params,}: {params: Promise<{ id: string }>;}) {
    const resolvedParams = use(params);
    const id = decodeURIComponent(resolvedParams.id).replace(/\+/g," ",);

    const repoMap: Record<string, string> = {
        React: "facebook/react",
        Bootstrap: "twbs/bootstrap",
        Flask: "pallets/flask",
        "Day.js": "iamkun/dayjs",
        "VS Code": "microsoft/vscode",
        jQuery: "jquery/jquery",
    };

    const repoName = repoMap[id];

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-200 p-8">
                <RepoLineChart repo={repoName} />
            </div>
        </div>
    );
}
