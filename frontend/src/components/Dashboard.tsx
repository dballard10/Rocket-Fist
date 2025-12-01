import WidgetCard from './WidgetCard';

// Mock data
const mockData = {
  activeMembers: 142,
  attendanceToday: 38,
  upcomingClasses: [
    { id: 1, name: 'Boxing Fundamentals', time: '6:00 PM', instructor: 'Mike Johnson' },
    { id: 2, name: 'BJJ Advanced', time: '7:00 PM', instructor: 'Sarah Chen' },
    { id: 3, name: 'Muay Thai', time: '8:00 PM', instructor: 'Tommy Rodriguez' },
    { id: 4, name: 'MMA Conditioning', time: '9:00 PM', instructor: 'Alex Kim' },
  ],
  paymentsLast7Days: 4850,
  paymentsTrend: '+12%',
};

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
        Dashboard
      </h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Active Members */}
        <WidgetCard title="Active Members">
          <div className="flex flex-col">
            <p className="text-4xl md:text-5xl font-bold text-white">
              {mockData.activeMembers}
            </p>
            <p className="text-[--color-neutral-gray] text-sm mt-2">Total active memberships</p>
          </div>
        </WidgetCard>

        {/* Attendance Today */}
        <WidgetCard title="Attendance Today">
          <div className="flex flex-col">
            <p className="text-4xl md:text-5xl font-bold text-white">
              {mockData.attendanceToday}
            </p>
            <p className="text-[--color-neutral-gray] text-sm mt-2">Members checked in today</p>
          </div>
        </WidgetCard>

        {/* Payments Last 7 Days */}
        <WidgetCard title="Payments (Last 7 Days)" className="md:col-span-2 lg:col-span-1">
          <div className="flex flex-col">
            <p className="text-4xl md:text-5xl font-bold text-white">
              ${mockData.paymentsLast7Days.toLocaleString()}
            </p>
            <p className="text-green-500 text-sm mt-2 font-semibold">
              {mockData.paymentsTrend} from last week
            </p>
          </div>
        </WidgetCard>
      </div>

      {/* Upcoming Classes Table */}
      <WidgetCard title="Upcoming Classes">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-2 text-[--color-primary-red] text-sm md:text-base font-semibold">
                  Class
                </th>
                <th className="text-left py-3 px-2 text-[--color-primary-red] text-sm md:text-base font-semibold">
                  Time
                </th>
                <th className="text-left py-3 px-2 text-[--color-primary-red] text-sm md:text-base font-semibold">
                  Instructor
                </th>
              </tr>
            </thead>
            <tbody>
              {mockData.upcomingClasses.map((classItem) => (
                <tr key={classItem.id} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                  <td className="py-3 px-2 text-white text-sm md:text-base">
                    {classItem.name}
                  </td>
                  <td className="py-3 px-2 text-[--color-neutral-gray] text-sm md:text-base">
                    {classItem.time}
                  </td>
                  <td className="py-3 px-2 text-[--color-neutral-gray] text-sm md:text-base">
                    {classItem.instructor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}

