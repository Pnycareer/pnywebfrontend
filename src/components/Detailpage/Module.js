import Particle from "@/components/effects/Particles";

export default function CourseFeature({ Modules }) {
  if (!Modules || !Modules.lectures) {
    return <p>No lectures available</p>;
  }

  const sortedLectures = [...Modules.lectures].sort(
    (a, b) => a.lectureNumber - b.lectureNumber
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-blue-500 overflow-hidden p-4">
      {/* Heading and Description */}
      <div className="absolute top-10 text-center z-20">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Course Module
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-xl text-gray-300 px-4">
          Our course modules offer a well-rounded curriculum, combining
          theoretical foundations with hands-on training, ensuring students
          acquire industry-relevant skills and knowledge for future endeavors.
        </p>
      </div>

      {/* Background Effect */}
      <Particle />

      {/* Main Card */}
      <div className="relative w-full max-w-5xl bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-5 border border-gray-600 z-10 mt-52 md:mt-48">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-hidden gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 p-4 bg-black/50 rounded-lg shadow-lg max-h-[300px] md:max-h-[500px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              📚 Lectures
            </h2>
            <div className="space-y-3">
              {sortedLectures.map((lecture) => (
                <button
                  key={lecture.lectureNumber}
                  className="w-full text-left px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white hover:bg-blue-400"
                >
                  🎓 Lecture {lecture.lectureNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 p-4 text-white overflow-y-auto max-h-[calc(90vh-2rem)] md:max-h-[500px]">
            <h1 className="md:text-3xl font-extrabold break-words">
              {sortedLectures[0].title}
            </h1>
            <p className="mt-3 md:text-lg text-gray-300">
              {sortedLectures[0].content}
            </p>
            <div className="mt-5">
              <h3 className="md:text-xl font-semibold text-blue-400">
                Key Topics:
              </h3>
              <div
                className="mt-3 text-gray-300 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: sortedLectures[0].topics }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
