export default function Banner() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-5 text-center" style={{
                background: `linear-gradient(135deg, #865EC3 0%, #6f4bb8 40%, #17AA5C 100%)`, }} >
            <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Repository Health Metrics Framework
                </h1>

                <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                    Modern software development increasingly relies on
                    distributed collaboration platforms such as
                    GitHub. While repository-level indicators like
                    stars, forks, and commit frequency are commonly
                    used to assess project popularity, they often fail
                    to reflect deeper aspects of maintainability,
                    quality, and long-term sustainability.
                </p>

                <p className="text-white/80 text-lg md:text-xl leading-relaxed mt-6">
                    This project aims to design and implement an
                    automated system that evaluates Git-based
                    repositories using quantifiable software
                    engineering metrics to generate a structured
                    health scorecard. The core research question
                    explores whether observable repository-level
                    indicators can reliably serve as proxies for
                    long-term software project health and
                    maintainability.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 hover:brightness-110"
                        style={{ backgroundColor: "#865EC3" }} > Read More </button>
                    <button className="px-8 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 hover:brightness-110"
                        style={{ backgroundColor: "#17AA5C" }} >  Get Started </button>
                </div>
            </div>
        </div>
    );
}
