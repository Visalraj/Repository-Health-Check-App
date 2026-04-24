import Link from "next/link";
export default function Page() {
    type Repo = {
        name: string;
        link: string;
    };
    
    type SectionProps = {
        title: string;
        subtitle: string;
        repos: Repo[];
    };
    const highQualityRepos = [
        { 
            name: "React",
            link: "https://github.com/facebook/react" 
        },
        {
            name: "VS Code",
            link: "https://github.com/microsoft/vscode",
        },
        {
            name: "Tensorflow",
            link: "https://github.com/tensorflow/tensorflow",
        },
        { name: "Django", link: "https://github.com/django/django" },
        {
            name: "Kubernetes",
            link: "https://github.com/kubernetes/kubernetes",
        },
    ];

    const mediumQualityRepos = [
        { name: "jQuery", link: "https://github.com/jquery/jquery" },
        {
            name: "Bootstrap",
            link: "https://github.com/twbs/bootstrap",
        },
        {
            name: "Moment.js",
            link: "https://github.com/moment/moment",
        },
        {
            name: "Three.js",
            link: "https://github.com/mrdoob/three.js",
        },
        { name: "Lodash", link: "https://github.com/lodash/lodash" },
    ];

    const lowQualityRepos = [
        { name: "Flask", link: "https://github.com/pallets/flask" },
        { name: "Day.js", link: "https://github.com/iamkun/dayjs" },
        {
            name: "DevConnector Django",
            link: "https://github.com/devmahmud/DevConnector-Django",
        },
        {
            name: "Django REST Tool",
            link: "https://github.com/yezyilomo/django-restql",
        },

        {
            name: "Nano ID",
            link: "https://github.com/ai/nanoid",
        },
    ];

    const Section = ({ title, subtitle, repos }: SectionProps) => (
        <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800">
                {title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{subtitle}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {repos.map((repo, index) => (
                    <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                    >
                        <p className="text-gray-800 font-medium mb-2">
                            {repo.name}
                        </p>

                        <div className="navigation-links flex gap-4">
                            <Link  href={repo.link} target="_blank" className="text-sm text-blue-600 hover:underline">
                                View Repo 
                            </Link>
                            {(index === 0 || index === 1) && (
                                <div className="flex gap-2">
                                    <Link href={`/check-health/manual-review/${encodeURIComponent(repo.name.trim()).replace(/%20/g, "+")}`} className="text-sm text-blue-600 hover:underline" >
                                        {" "}
                                        Manual Review 
                                    </Link>
                                    <Link href={`/check-health/api-review/${encodeURIComponent(repo.name.trim()).replace(/%20/g, "+")}`}
                                        className="text-sm text-blue-600 hover:underline" >
                                        {" "}
                                        Api Review
                                    </Link>
                                    <Link
                                        href={`/check-health/final-review/${encodeURIComponent(repo.name.trim()).replace(/%20/g, "+")}`} className="text-sm text-blue-600 hover:underline" >
                                        {" "}
                                        Final Review 
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-200 p-8">

                <div className="mb-10 text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Repository Health Check
                    </h1>
                    <p className="text-gray-500 mt-1">
                        A collection of repositories grouped by
                        quality.
                    </p>
                </div>

                {/* Sections */}
                <Section title="High Quality" subtitle="Well-maintained and production-ready repositories." repos={highQualityRepos}/>

                <Section title="Medium Quality" subtitle="Good projects with some room for improvement." repos={mediumQualityRepos}/>

                <Section title="Low Quality" subtitle="Projects that need better structure or maintenance." repos={lowQualityRepos}/>
            </div>
        </div>
    );
}
