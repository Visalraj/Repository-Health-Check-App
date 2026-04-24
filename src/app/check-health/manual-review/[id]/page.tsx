import Link from "next/link";
export default async function ManualReview({params}:{params:Promise<{id:string}>}){
    let {id} = await params;
    id = decodeURIComponent(id).replace(/\+/g, ' ');
    const reactConstants = [
        {label:'Code Quality',weight:'20',score:'9',justification:'Highly modular, well-structured, industry standard'},
        {label:'Documentation',weight:'15',score:'10',justification:'Extensive docs, tutorials, contribution guides'},
        {label:'Commit Activity',weight:'15',score:'9',justification:'Frequent and consistent commits'},
        {label:'Issue Management',weight:'10',score:'8',justification:'Well-managed but high volume'},
        {label:'Pull Requests',weight:'10',score:'9',justification:'Strong review process'},
        {label:'Testing',weight:'10',score:'9',justification:'Comprehensive automated testing'},
        {label:'Contributors',weight:'10',score:'10',justification:'Large, diverse contributor base'},
        {label:'Maintainability',weight:'10',score:'9',justification:'Long-term sustainability and updates'}
    ];
    
    const reactScore = 9.1
    const reactInterpretation = [
        "Confirms React as a highly healthy project",
        "Strong across all dimensions (technical + social)",
        "Slight deduction due to the inherent complexity of managing a large-scale system, which increases maintenance overhead and issue volume.",
    ];
    const reactLink = "facebook/react";


    const jQueryConstants = [
        {label:'Code Quality',weight:'20',score:'7',justification:'Stable and well-structured, but includes legacy design patterns'},
        {label:'Documentation',weight:'15',score:'8',justification:'Comprehensive and historically strong, though less aligned with modern practices'},
        {label:'Commit Activity',weight:'15',score:'5',justification:'Lower frequency of updates compared to modern frameworks'},
        {label:'Issue Management',weight:'10',score:'6',justification:'Issues are tracked, but response and resolution can be slower'},
        {label:'Pull Requests',weight:'10',score:'5',justification:'Limited contribution activity and fewer active reviews'},
        {label:'Testing',weight:'10',score:'7',justification:'Established and reliable testing practices, but not actively evolving'},
        {label:'Contributors',weight:'10',score:'5',justification:'Declining contributor engagement over time'},
        {label:'Maintainability',weight:'10',score:'6',justification:'Stable but less future-focused and innovation-driven'}
    ];

    const jQueryScore = 6.3;

    const jQueryInterpretation = [
        "Strong historical impact and stability",
        "Lower modern activity and innovation",
        "High popularity does not necessarily imply high current project health",
    ];
    const jQueryLink = "jquery/jquery";


    const flaskConstants = [
        {label:'Code Quality',weight:'20',score:'9',justification:'Clean, minimalistic, and well-structured codebase'},
        {label:'Documentation',weight:'15',score:'9',justification:'Excellent official documentation and clear usage guides'},
        {label:'Commit Activity',weight:'15',score:'7',justification:'Moderate but consistent maintenance activity'},
        {label:'Issue Management',weight:'10',score:'8',justification:'Issues are actively tracked and reasonably resolved'},
        {label:'Pull Requests',weight:'10',score:'8',justification:'Well-managed contributions with review processes'},
        {label:'Testing',weight:'10',score:'8',justification:'Good testing practices integrated into development'},
        {label:'Contributors',weight:'10',score:'7',justification:'Moderate contributor base, smaller than large frameworks'},
        {label:'Maintainability',weight:'10',score:'9',justification:'Highly maintainable due to simplicity and modularity'}
    ];

    const flaskScore = 8.2;

    const flaskInterpretation = [
        "Strong code quality and documentation",
        "High maintainability due to simplicity",
        "Slightly lower activity compared to large-scale frameworks",
    ];

    const flaskLink = "pallets/flask";

    const vsCodeConstants = [
        {label:'Code Quality',weight:'20',score:'9',justification:'Highly modular, enterprise-level architecture'},
        {label:'Documentation',weight:'15',score:'9',justification:'Extensive docs, guides, and contribution resources'},
        {label:'Commit Activity',weight:'15',score:'10',justification:'Very frequent and continuous development'},
        {label:'Issue Management',weight:'10',score:'9',justification:'Well-structured issue tracking with active triaging'},
        {label:'Pull Requests',weight:'10',score:'9',justification:'Strong review process and collaboration'},
        {label:'Testing',weight:'10',score:'9',justification:'Robust testing and CI/CD integration'},
        {label:'Contributors',weight:'10',score:'10',justification:'Very large and active contributor community'},
        {label:'Maintainability',weight:'10',score:'9',justification:'Long-term evolution with regular updates'}
    ];
    const vsCodeScore = 9.2;
    const vsCodeInterpretation = [
        "Extremely active development lifecycle",
        "Strong engineering practices and testing",
        "Excellent community and contributor engagement.",
    ];
    const vsCodeLink = "microsoft/vscode";

    const bootstrapConstants = [
        {label:'Code Quality',weight:'20',score:'8',justification:'Well-structured and modular CSS/JS framework'},
        {label:'Documentation',weight:'15',score:'9',justification:'Excellent documentation with examples and guides'},
        {label:'Commit Activity',weight:'15',score:'8',justification:'Active but less frequent than top-tier projects'},
        {label:'Issue Management',weight:'10',score:'7',justification:'High number of issues; managed but slower at scale'},
        {label:'Pull Requests',weight:'10',score:'8',justification:'Active contribution and review process'},
        {label:'Testing',weight:'10',score:'7',justification:'Testing exists but less extensive than large systems'},
        {label:'Contributors',weight:'10',score:'9',justification:'Large and active contributor base'},
        {label:'Maintainability',weight:'10',score:'8',justification:'Stable and widely maintained framework'}
    ]
    const bootstrapScore = 8.1;
    const bootstrapInterpretation = [
        "Strong documentation and usability",
        "Large contributor base and community support",
        "High popularity can align with high health, but with scalability challenges",
    ];
    const bootstrapLink = "twbs/bootstrap"; 

    const dayJsConstants = [
        {label:'Code Quality',weight:'20',score:'9',justification:'Clean, minimalistic, and highly modular design'},
        {label:'Documentation',weight:'15',score:'8',justification:'Clear and concise documentation, though less extensive than larger frameworks'},
        {label:'Commit Activity',weight:'15',score:'7',justification:'Moderate but consistent updates'},
        {label:'Issue Management',weight:'10',score:'8',justification:'Issues are tracked and reasonably well managed'},
        {label:'Pull Requests',weight:'10',score:'8',justification:'Active contributions with structured review process'},
        {label:'Testing',weight:'10',score:'8',justification:'Good testing coverage for a lightweight library'},
        {label:'Contributors',weight:'10',score:'7',justification:'Moderate contributor base'},
        {label:'Maintainability',weight:'10',score:'9',justification:'High maintainability due to simplicity and focused scope'}
    ];
    const dayJsScore = 8.0;
    const dayJsInterpretation = [
        "Strong code quality and maintainability",
        "Efficient design with focused functionality",
        "Smaller repositories can still achieve high project health through simplicity and good design",
    ];
    const dayJsLink = "iamkun/dayjs";

    const constants = (id === 'React' ? reactConstants : id === 'jQuery' ? jQueryConstants : id === 'Flask' ? flaskConstants : id === 'VS Code' ? vsCodeConstants : id === 'Bootstrap' ? bootstrapConstants : id === 'Day.js' ? dayJsConstants : []);
    const score = id === "React" ? reactScore : id === 'jQuery' ? jQueryScore : id === 'Flask' ? flaskScore : id === 'VS Code' ? vsCodeScore : id === 'Bootstrap' ? bootstrapScore : id === 'Day.js' ? dayJsScore : 0;
    const interpretation = id === "React" ? reactInterpretation : id === 'jQuery' ? jQueryInterpretation : id === 'Flask' ? flaskInterpretation : id === 'VS Code' ? vsCodeInterpretation : id === 'Bootstrap' ? bootstrapInterpretation : id === 'Day.js' ? dayJsInterpretation : [];
    const github = id === "React" ? reactLink : id === 'jQuery' ? jQueryLink : id === 'Flask' ? flaskLink : id === 'VS Code' ? vsCodeLink : id === 'Bootstrap' ? bootstrapLink : id === 'Day.js' ? dayJsLink : '';
    
    return (
        <>
            <div className="min-h-screen bg-gray-50 px-4 py-10">
                <div className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-200 p-8">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Manual Qualitative Review of{" "}
                            <span className="text-blue-400">
                                {decodeURIComponent(id).replace(/\+/g, ' ')}
                            </span>{" "}
                            Repository
                        </h1>
                        <p className="text-black mt-3 text-justify">
                            This page presents a complete manual evaluation of the repository using a structured scoring framework. 
                            Each factor is assessed individually in the detailed manual scores section, based on predefined weights. 
                            The final weighted score is then calculated to provide an overall evaluation. 
                            An interpretation is included to explain what the final score means in terms of repository quality and maintainability.
                            <Link className='text-blue-500 cursor-pointer hover:underline' target="_blank" href={`https://github.com/${github}`}> See Repo here  →</Link>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Scoring Framework
                                </h2>
                                <p className="text-sm text-gray-500">
                                    We use a simple 10-point scale for
                                    each factor.
                                </p>
                            </div>

                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
                                    <tr>
                                        <th className="px-6 py-3">
                                            Factor
                                        </th>
                                        <th className="px-6 py-3">
                                            Weight
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {constants.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-800">
                                                {item.label}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.weight}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/** table 2 */}

                    <div className="mt-10">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Detailed Manual Scores
                                </h2>
                                <p className="text-sm text-gray-500">
                                    We use a simple 10-point scale for
                                    each factor.
                                </p>
                            </div>

                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
                                    <tr>
                                        <th className="px-6 py-3">
                                            Factor
                                        </th>
                                        <th className="px-6 py-3">
                                            Score (/10)
                                        </th>
                                        <th className="px-6 py-3">
                                            Justification
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {constants.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-800">
                                                {item.label}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.score}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.justification}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/**Score Calculation */}

                    <div className="mt-10">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                    Final Weighted Score Calculation
                                </h2>
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">
                                        Total Score
                                    </span>{" "}
                                    ={" "}
                                    {constants
                                        .map(
                                            (item) =>
                                                `(${item.score} × ${Number(item.weight) / 100})`,
                                        )
                                        .join(" + ")}
                                </p>
                                <p>≈ {score} / 10</p>
                            </div>
                        </div>
                    </div>

                    {/**Final Interpretation */}

                    <div className="mt-10">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                    Interpretation
                                </h2>
                                <ul className="list-disc">
                                    {interpretation.map(
                                        (item, index) => (
                                            <li key={index} className={index === 2 ? "font-semibold" : ""}>
                                                {item}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}