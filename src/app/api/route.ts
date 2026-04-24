type GitHubRepo = {
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    description: string | null;
    language: string | null;
    pushed_at: string;
};

type GitHubContributor = {
    id: number;
};

type GitHubPR = {
    id: number;
};

type GitHubIssue = {
    id: number;
    pull_request?: unknown;
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const repoName = searchParams.get("repo");

    if (!repoName) {
        return Response.json(
            { error: "Missing repo name" },
            { status: 400 },
        );
    }

    const headers = {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    };

    // -----------------------------
    // 🔹 REPO DATA
    // -----------------------------
    const repoRes = await fetch(
        `https://api.github.com/repos/${repoName}`,
        { headers },
    );
    const repo: GitHubRepo = await repoRes.json();

    // -----------------------------
    // 🔹 CONTRIBUTORS
    // -----------------------------
    const contributorsRes = await fetch(
        `https://api.github.com/repos/${repoName}/contributors?per_page=100`,
        { headers },
    );
    const contributors: GitHubContributor[] =
        await contributorsRes.json();

    // -----------------------------
    // 🔹 PULL REQUESTS
    // -----------------------------
    const pullsRes = await fetch(
        `https://api.github.com/repos/${repoName}/pulls?state=all&per_page=100`,
        { headers },
    );
    const pulls: GitHubPR[] = await pullsRes.json();

    // -----------------------------
    // 🔹 ISSUES
    // -----------------------------
    const issuesRes = await fetch(
        `https://api.github.com/repos/${repoName}/issues?state=all&per_page=100`,
        { headers },
    );
    const issues: GitHubIssue[] = await issuesRes.json();

    const issuesOnly: GitHubIssue[] = Array.isArray(issues)
        ? issues.filter((i) => !i.pull_request)
        : [];

    // -----------------------------
    // 🔥 SCORING FUNCTIONS
    // -----------------------------

    const scoreCommitActivity = (repo: GitHubRepo): number => {
        const lastPush = new Date(repo.pushed_at);
        const daysSincePush =
            (Date.now() - lastPush.getTime()) / (1000 * 60 * 60 * 24);

        if (daysSincePush < 7) return 10;
        if (daysSincePush < 30) return 9;
        if (daysSincePush < 90) return 8;
        if (daysSincePush < 180) return 7;
        return 5;
    };

    const scoreIssues = (open: number): number => {
        if (open < 50) return 9;
        if (open < 200) return 7;
        return 5;
    };

    const scorePRs = (count: number): number => {
        if (count > 1000) return 10;
        if (count > 500) return 9;
        if (count > 200) return 8;
        if (count > 100) return 7;
        return 6;
    };

    const scoreContributors = (count: number): number => {
        if (count > 500) return 10;
        if (count > 200) return 9;
        if (count > 100) return 8;
        if (count > 50) return 7;
        return 6;
    };

    const scoreDocs = (hasDesc: boolean): number => (hasDesc ? 8 : 5);

    const scoreTesting = (repo: GitHubRepo): number =>
        repo.language ? 7 : 5;

    // -----------------------------
    // 📊 SCORES
    // -----------------------------
    const commitScore = scoreCommitActivity(repo);
    const issueScore = scoreIssues(repo.open_issues_count);
    const prScore = scorePRs(pulls.length);
    const contributorScore = scoreContributors(contributors.length);
    const docScore = scoreDocs(!!repo.description);
    const testingScore = scoreTesting(repo);

    const codeQualityScore = Math.round((prScore + issueScore) / 2);

    const maintainabilityScore = Math.round(
        (commitScore + contributorScore + issueScore) / 3,
    );

    // -----------------------------
    // 📈 GRAPH DATA
    // -----------------------------
    const graph = {
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
                    codeQualityScore,
                    docScore,
                    commitScore,
                    issueScore,
                    prScore,
                    testingScore,
                    contributorScore,
                    maintainabilityScore,
                ],
            },
        ],
    };

    // -----------------------------
    // ✅ RESPONSE
    // -----------------------------
    return Response.json({
        repo: repoName,

        raw: {
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            openIssues: repo.open_issues_count,
            issues: issuesOnly.length,
            pulls: pulls.length,
            contributors: contributors.length,
            language: repo.language,
            pushedAt: repo.pushed_at,
        },

        scores: {
            codeQuality: codeQualityScore,
            documentation: docScore,
            commitActivity: commitScore,
            issueManagement: issueScore,
            pullRequests: prScore,
            testing: testingScore,
            contributors: contributorScore,
            maintainability: maintainabilityScore,
        },

        graph,
    });
}
